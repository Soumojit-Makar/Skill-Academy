import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import routes from './routes/index.js';
import { rateLimit } from "express-rate-limit";
const app = express();

// Connect DB
connectDB();

// Security & parsing
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', ts: Date.now() }));

// All routes
app.use('/api', routes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.path} not found` }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
