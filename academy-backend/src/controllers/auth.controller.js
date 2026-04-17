import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
});

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.isActive || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    res.json({ success: true, token: signToken(user._id), user: user.toJSON() });
  } catch (err) { next(err); }
};

export const getMe = (req, res) => res.json({ success: true, user: req.user });

// Seed first admin (only works if no users exist)
export const seedAdmin = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    if (count > 0) {
      return res.status(403).json({ success: false, message: 'Setup already completed' });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'name, email and password required' });
    }
    const user = await User.create({ name, email, password, role: 'superadmin' });
    res.status(201).json({ success: true, message: 'Superadmin created', user: user.toJSON() });
  } catch (err) { next(err); }
};
