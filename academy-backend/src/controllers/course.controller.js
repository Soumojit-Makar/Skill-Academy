import { Course } from '../models/index.js';

export const getPublicCourses = async (req, res, next) => {
  try {
    const { category, search, level, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (level)    filter.level = level;
    if (search)   filter.$or = [
      { title:       { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];

    const [data, total] = await Promise.all([
      Course.find(filter)
        .populate('category', 'name slug')
        .select('-curriculum')
        .sort({ isFeatured: -1, sortOrder: 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Course.countDocuments(filter),
    ]);

    res.json({ success: true, data, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

export const getCourseBySlug = async (req, res, next) => {
  try {
    const data = await Course.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug');
    if (!data) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const adminListCourses = async (req, res, next) => {
  try {
    const data = await Course.find().populate('category', 'name').sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const adminCreateCourse = async (req, res, next) => {
  try {
    const data = await Course.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const adminUpdateCourse = async (req, res, next) => {
  try {
    const data = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const adminDeleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
};
