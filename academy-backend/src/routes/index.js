import { Router } from 'express';
import { login, getMe, seedAdmin } from '../controllers/auth.controller.js';
import { protect, requireRoles } from '../middleware/auth.middleware.js';
import { authLimiter, enquiryLimiter } from '../middleware/rateLimiter.middleware.js';
import {
  createEnquiry, listEnquiries, getEnquiry, updateEnquiry,
  deleteEnquiry, exportEnquiries, getDashboard,
} from '../controllers/enquiry.controller.js';
import {
  getPublicCourses, getCourseBySlug,
  adminListCourses, adminCreateCourse, adminUpdateCourse, adminDeleteCourse,
} from '../controllers/course.controller.js';
import {
  Category, Blog, Testimonial, FAQ, Gallery, Settings,
} from '../models/index.js';

const r = Router();
const adminOnly = requireRoles('admin', 'superadmin');

// ─── AUTH ────────────────────────────────────────────────────────
r.post('/auth/login',     authLimiter, login);
r.post('/auth/seed',      seedAdmin);          // one-time setup endpoint
r.get('/auth/me',         protect, getMe);

// ─── PUBLIC ──────────────────────────────────────────────────────
r.get('/courses',         getPublicCourses);
r.get('/courses/:slug',   getCourseBySlug);

r.get('/categories', async (_, res, next) => {
  try {
    const data = await Category.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

r.get('/blogs', async (req, res, next) => {
  try {
    const { page = 1, limit = 9 } = req.query;
    const filter = { status: 'published' };
    const [data, total] = await Promise.all([
      Blog.find(filter).populate('author', 'name').sort({ publishedAt: -1 })
        .skip((page - 1) * limit).limit(Number(limit)),
      Blog.countDocuments(filter),
    ]);
    res.json({ success: true, data, total });
  } catch (e) { next(e); }
});

r.get('/blogs/:slug', async (req, res, next) => {
  try {
    const data = await Blog.findOne({ slug: req.params.slug, status: 'published' }).populate('author', 'name');
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

r.get('/testimonials', async (_, res, next) => {
  try {
    const data = await Testimonial.find({ isApproved: true }).sort({ sortOrder: 1 });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

r.get('/faqs', async (_, res, next) => {
  try {
    const data = await FAQ.find({ isActive: true }).sort({ category: 1, sortOrder: 1 });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

r.get('/gallery', async (_, res, next) => {
  try {
    const data = await Gallery.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

r.get('/settings/public', async (_, res, next) => {
  try {
    const data = await Settings.findById('site').select('siteName tagline logo phone email address socialLinks seo');
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

// ─── ENQUIRIES (public submit) ───────────────────────────────────
r.post('/enquiries', enquiryLimiter, createEnquiry);

// ─── ADMIN ──────────────────────────────────────────────────────
r.use('/admin', protect);

r.get('/admin/dashboard', getDashboard);

// Enquiries admin
r.get('/admin/enquiries/export', adminOnly, exportEnquiries);
r.get('/admin/enquiries',        listEnquiries);
r.get('/admin/enquiries/:id',    getEnquiry);
r.patch('/admin/enquiries/:id',  updateEnquiry);
r.delete('/admin/enquiries/:id', adminOnly, deleteEnquiry);

// Courses admin
r.get('/admin/courses',        adminListCourses);
r.post('/admin/courses',       adminOnly, adminCreateCourse);
r.put('/admin/courses/:id',    adminOnly, adminUpdateCourse);
r.delete('/admin/courses/:id', adminOnly, adminDeleteCourse);

// Categories admin
r.get('/admin/categories',        async (_, res, next) => { try { const d = await Category.find().sort({ sortOrder: 1 }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.post('/admin/categories',       adminOnly, async (req, res, next) => { try { const d = await Category.create(req.body); res.status(201).json({ success: true, data: d }); } catch (e) { next(e); } });
r.put('/admin/categories/:id',    adminOnly, async (req, res, next) => { try { const d = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.delete('/admin/categories/:id', adminOnly, async (req, res, next) => { try { await Category.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } });

// Blogs admin
r.get('/admin/blogs',        async (_, res, next) => { try { const d = await Blog.find().populate('author', 'name').sort({ createdAt: -1 }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.post('/admin/blogs',       adminOnly, async (req, res, next) => { try { const d = await Blog.create({ ...req.body, author: req.user._id }); res.status(201).json({ success: true, data: d }); } catch (e) { next(e); } });
r.put('/admin/blogs/:id',    adminOnly, async (req, res, next) => { try { const d = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.delete('/admin/blogs/:id', adminOnly, async (req, res, next) => { try { await Blog.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } });

// Testimonials admin
r.get('/admin/testimonials',          async (_, res, next) => { try { const d = await Testimonial.find().sort({ sortOrder: 1 }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.post('/admin/testimonials',         adminOnly, async (req, res, next) => { try { const d = await Testimonial.create(req.body); res.status(201).json({ success: true, data: d }); } catch (e) { next(e); } });
r.put('/admin/testimonials/:id',      adminOnly, async (req, res, next) => { try { const d = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.delete('/admin/testimonials/:id',   adminOnly, async (req, res, next) => { try { await Testimonial.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } });

// FAQs admin
r.get('/admin/faqs',        async (_, res, next) => { try { const d = await FAQ.find().sort({ category: 1, sortOrder: 1 }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.post('/admin/faqs',       adminOnly, async (req, res, next) => { try { const d = await FAQ.create(req.body); res.status(201).json({ success: true, data: d }); } catch (e) { next(e); } });
r.put('/admin/faqs/:id',    adminOnly, async (req, res, next) => { try { const d = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.delete('/admin/faqs/:id', adminOnly, async (req, res, next) => { try { await FAQ.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } });

// Gallery admin
r.get('/admin/gallery',        async (_, res, next) => { try { const d = await Gallery.find().sort({ sortOrder: 1 }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.post('/admin/gallery',       adminOnly, async (req, res, next) => { try { const d = await Gallery.create(req.body); res.status(201).json({ success: true, data: d }); } catch (e) { next(e); } });
r.put('/admin/gallery/:id',    adminOnly, async (req, res, next) => { try { const d = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.delete('/admin/gallery/:id', adminOnly, async (req, res, next) => { try { await Gallery.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { next(e); } });

// Settings admin
r.get('/admin/settings', async (_, res, next) => { try { const d = await Settings.findById('site'); res.json({ success: true, data: d }); } catch (e) { next(e); } });
r.put('/admin/settings', adminOnly, async (req, res, next) => {
  try {
    const d = await Settings.findByIdAndUpdate('site', req.body, { new: true, upsert: true, setDefaultsOnInsert: true });
    const { resetTransporter } = await import('../config/mailer.js');
    resetTransporter();
    res.json({ success: true, data: d });
  } catch (e) { next(e); }
});

export default r;
