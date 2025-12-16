import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import auctionRoutes from './routes/auction.routes.js';
import bidRoutes from './routes/bid.routes.js';
import adminRoutes from './routes/admin.routes.js';
import repRoutes from './routes/rep.routes.js';
import uploadRoutes from './routes/upload.routes.js';

import { 
  initializeCombinedStatusChecker,
  checkStatusesMiddleware 
} from './services/auctionStatus.service.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: false  
}));

// preflight
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Auction Platform API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// This ensures status updates happen on user activity 
app.use('/api/auctions', checkStatusesMiddleware, auctionRoutes);
app.use('/api/bids', checkStatusesMiddleware, bidRoutes);

// Other routes (no middleware needed)
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rep', repRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      
      // This runs every 1 minute when server is awake
      initializeCombinedStatusChecker(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();