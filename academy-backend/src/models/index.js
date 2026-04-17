import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ─── USER ───────────────────────────────────────────────────────
const UserSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, select: false },
  role:      { type: String, enum: ['superadmin', 'admin', 'counselor'], default: 'counselor' },
  isActive:  { type: Boolean, default: true },
  lastLogin: Date,
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
UserSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = mongoose.model('User', UserSchema);

// ─── CATEGORY ───────────────────────────────────────────────────
const CategorySchema = new mongoose.Schema({
  name:      { type: String, required: true },
  slug:      { type: String, unique: true },
  icon:      String,
  isActive:  { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });
CategorySchema.pre('save', function (next) {
  if (!this.slug) this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  next();
});
export const Category = mongoose.model('Category', CategorySchema);

// ─── COURSE ─────────────────────────────────────────────────────
const CurriculumSchema = new mongoose.Schema({
  title:    String,
  topics:   [String],
  duration: String,
});
const CourseSchema = new mongoose.Schema({
  title:            { type: String, required: true },
  slug:             { type: String, unique: true },
  category:         { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tagline:          String,
  description:      String,
  thumbnail:        String,
  duration:         String,
  mode:             { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Offline' },
  level:            { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  curriculum:       [CurriculumSchema],
  highlights:       [String],
  tools:            [String],
  placementSupport: { type: Boolean, default: true },
  isFeatured:       { type: Boolean, default: false },
  isActive:         { type: Boolean, default: true },
  sortOrder:        { type: Number, default: 0 },
  seo: {
    metaTitle:       String,
    metaDescription: String,
    keywords:        [String],
    ogImage:         String,
  },
}, { timestamps: true });
CourseSchema.pre('save', function (next) {
  if (!this.slug) this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  next();
});
export const Course = mongoose.model('Course', CourseSchema);

// ─── ENQUIRY ────────────────────────────────────────────────────
const EnquirySchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, lowercase: true },
  phone:      { type: String, required: true },
  course:     { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  courseName: String,
  message:    String,
  source:     { type: String, enum: ['home', 'course', 'popup', 'contact'], default: 'home' },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Interested', 'Follow-up', 'Converted', 'Closed'],
    default: 'New',
  },
  counselorNotes: String,
  followUpDate:   Date,
  assignedTo:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  aiSummary: {
    studentIntent:        String,
    courseInterest:       String,
    leadQuality:          { type: String, enum: ['Hot', 'Warm', 'Cold'] },
    suggestedTone:        String,
    actionRecommendation: String,
    studentMailBody:      String,
    raw:                  String,
    generatedAt:          Date,
    error:                String,
  },
  adminMailSent:   { type: Boolean, default: false },
  studentMailSent: { type: Boolean, default: false },
  mailError:       String,
}, { timestamps: true });
EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ email: 1 });
export const Enquiry = mongoose.model('Enquiry', EnquirySchema);

// ─── BLOG ───────────────────────────────────────────────────────
const BlogSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, unique: true },
  excerpt:     String,
  content:     String,
  thumbnail:   String,
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags:        [String],
  status:      { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: Date,
  seo: { metaTitle: String, metaDescription: String, keywords: [String] },
}, { timestamps: true });
BlogSchema.pre('save', function (next) {
  if (!this.slug) this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  if (this.status === 'published' && !this.publishedAt) this.publishedAt = new Date();
  next();
});
export const Blog = mongoose.model('Blog', BlogSchema);

// ─── TESTIMONIAL ────────────────────────────────────────────────
const TestimonialSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  role:       String,
  course:     String,
  content:    { type: String, required: true },
  rating:     { type: Number, min: 1, max: 5, default: 5 },
  avatar:     String,
  isApproved: { type: Boolean, default: false },
  sortOrder:  { type: Number, default: 0 },
}, { timestamps: true });
export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

// ─── FAQ ────────────────────────────────────────────────────────
const FAQSchema = new mongoose.Schema({
  question:  { type: String, required: true },
  answer:    { type: String, required: true },
  category:  { type: String, default: 'General' },
  isActive:  { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });
export const FAQ = mongoose.model('FAQ', FAQSchema);

// ─── GALLERY ────────────────────────────────────────────────────
const GallerySchema = new mongoose.Schema({
  title:     String,
  imageUrl:  { type: String, required: true },
  category:  String,
  isActive:  { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });
export const Gallery = mongoose.model('Gallery', GallerySchema);

// ─── SETTINGS (singleton) ───────────────────────────────────────
const SettingsSchema = new mongoose.Schema({
  _id:      { type: String, default: 'site' },
  siteName: { type: String, default: 'Academy' },
  tagline:  String,
  logo:     String,
  favicon:  String,
  phone:    String,
  email:    String,
  address:  String,
  socialLinks: {
    facebook:  String,
    instagram: String,
    linkedin:  String,
    youtube:   String,
  },
  adminNotificationEmail: String,
  seo: {
    defaultTitle:       String,
    defaultDescription: String,
    googleAnalyticsId:  String,
  },
}, { _id: false, timestamps: true });
export const Settings = mongoose.model('Settings', SettingsSchema);
