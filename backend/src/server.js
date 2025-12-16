/**
 * ============================================
 * server.js
 * ============================================
 * Main application entry point
 * Configures Express server, middleware, routes, and services
 */

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

// CORS configuration - allow all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: false  
}));

// Handle preflight requests
app.options("*", cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Auction Platform API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Mount routes with status check middleware on auction/bid routes
app.use('/api/auctions', checkStatusesMiddleware, auctionRoutes);
app.use('/api/bids', checkStatusesMiddleware, bidRoutes);

// Mount other routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rep', repRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler for undefined routes
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

/**
 * Start server after database connection
 * Initializes auction status checker on startup
 */
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      
      // Initialize background service to check auction status every minute
      initializeCombinedStatusChecker(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();