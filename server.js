import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit'; 
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// DB
connectDB();

// CORS (Single, proper config)
app.use(cors({
  origin: [
    "http://localhost:5173", // dev frontend
    "https://dbuzzz-frontend-5ymj.vercel.app" // live frontend
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => res.send('API is running'));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
