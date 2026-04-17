import { Enquiry, Course } from '../models/index.js';
import { generateEnquiryInsights } from '../services/ai.service.js';
import { sendAdminNotification, sendStudentAck } from '../services/mail.service.js';

// Lazy import json2csv to avoid issues
const getParser = async () => {
  const { Parser } = await import('json2csv');
  return Parser;
};

export const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, courseId, courseName: cName, message, source } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'name, email, phone are required' });
    }

    let courseName = cName || null;
    if (courseId && !courseName) {
      const course = await Course.findById(courseId).select('title');
      courseName = course?.title;
    }

    const enquiry = await Enquiry.create({
      name, email, phone, message,
      source: source || 'home',
      course: courseId || undefined,
      courseName,
    });

    // Respond immediately
    res.status(201).json({ success: true, message: 'Enquiry received! We will contact you soon.' });

    // Non-blocking background work
    (async () => {
      let aiSummary = null;
      try {
        aiSummary = await generateEnquiryInsights({ ...enquiry.toObject(), courseName });
        enquiry.aiSummary = {
          studentIntent:        aiSummary.studentIntent,
          courseInterest:       aiSummary.courseInterest,
          leadQuality:          aiSummary.leadQuality,
          suggestedTone:        aiSummary.suggestedTone,
          actionRecommendation: aiSummary.actionRecommendation,
          studentMailBody:      aiSummary.studentMailBody,
          raw:                  JSON.stringify(aiSummary),
          generatedAt:          new Date(),
        };
      } catch (aiErr) {
        enquiry.aiSummary = { error: aiErr.message };
        console.error('AI service error:', aiErr.message);
      }

      const [adminRes, studentRes] = await Promise.allSettled([
        sendAdminNotification(enquiry, aiSummary),
        sendStudentAck(enquiry, aiSummary),
      ]);

      enquiry.adminMailSent   = adminRes.status === 'fulfilled';
      enquiry.studentMailSent = studentRes.status === 'fulfilled';
      if (adminRes.status === 'rejected')   enquiry.mailError = adminRes.reason?.message;
      if (studentRes.status === 'rejected') console.error('Student mail failed:', studentRes.reason?.message);

      await enquiry.save();
    })();

  } catch (err) { next(err); }
};

export const listEnquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) filter.$or = [
      { name:  { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];

    const [data, total] = await Promise.all([
      Enquiry.find(filter)
        .populate('course', 'title slug')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Enquiry.countDocuments(filter),
    ]);

    res.json({ success: true, data, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

export const getEnquiry = async (req, res, next) => {
  try {
    const data = await Enquiry.findById(req.params.id)
      .populate('course', 'title slug')
      .populate('assignedTo', 'name email');
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateEnquiry = async (req, res, next) => {
  try {
    const allowed = ['status', 'counselorNotes', 'followUpDate', 'assignedTo'];
    const update = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) update[k] = req.body[k]; });
    const data = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteEnquiry = async (req, res, next) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
};

export const exportEnquiries = async (req, res, next) => {
  try {
    const Parser = await getParser();
    const enquiries = await Enquiry.find({}).lean();
    const rows = enquiries.map(e => ({
      Name:             e.name,
      Email:            e.email,
      Phone:            e.phone,
      Course:           e.courseName || '',
      Source:           e.source,
      Status:           e.status,
      'Lead Quality':   e.aiSummary?.leadQuality || '',
      'Counselor Notes': e.counselorNotes || '',
      'Follow Up Date': e.followUpDate ? new Date(e.followUpDate).toLocaleDateString() : '',
      'Created At':     new Date(e.createdAt).toLocaleString('en-IN'),
    }));
    const csv = new Parser().parse(rows);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="enquiries.csv"');
    res.send(csv);
  } catch (err) { next(err); }
};

export const getDashboard = async (req, res, next) => {
  try {
    const [totalEnquiries, statusCounts, leadQualityCounts, courseWise, recent] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Enquiry.aggregate([
        { $match: { 'aiSummary.leadQuality': { $exists: true, $ne: null } } },
        { $group: { _id: '$aiSummary.leadQuality', count: { $sum: 1 } } },
      ]),
      Enquiry.aggregate([
        { $group: { _id: '$courseName', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Enquiry.find().sort({ createdAt: -1 }).limit(5)
        .select('name email courseName status createdAt'),
    ]);
    res.json({ success: true, data: { totalEnquiries, statusCounts, leadQualityCounts, courseWise, recent } });
  } catch (err) { next(err); }
};
