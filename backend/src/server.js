// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/database.js';

// // Import routes
// import authRoutes from './routes/auth.routes.js';
// import auctionRoutes from './routes/auction.routes.js';
// import bidRoutes from './routes/bid.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import repRoutes from './routes/rep.routes.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Auction Platform API',
//     status: 'running',
//     timestamp: new Date().toISOString()
//   });
// });

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/auctions', auctionRoutes);
// app.use('/api/bids', bidRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/rep', repRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(err.status || 500).json({ 
//     error: err.message || 'Internal server error' 
//   });
// });

// // Start server
// const startServer = async () => {
//   try {
//     // Connect to database
//     await connectDB();
    
//     // Start listening
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//       console.log(`📚 API Documentation available at http://localhost:${PORT}/api`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/database.js';

// // Import routes
// import authRoutes from './routes/auth.routes.js';
// import auctionRoutes from './routes/auction.routes.js';
// import bidRoutes from './routes/bid.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import repRoutes from './routes/rep.routes.js';
// import uploadRoutes from './routes/upload.routes.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// // CORS configuration
// const allowedOrigins = [
//   'http://localhost:3000', // your frontend in dev
//   // Add production frontend URL here, e.g., 'https://yourapp.com'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true, // allow cookies/auth headers
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Preflight requests (for POST/PUT with credentials)
// app.options('*', cors());

// // Request logging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// // Health check
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Auction Platform API',
//     status: 'running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/auctions', auctionRoutes);
// app.use('/api/bids', bidRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/rep', repRoutes);
// app.use('/api/upload', uploadRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message || err);
//   res.status(err.status || 500).json({ 
//     error: err.message || 'Internal server error' 
//   });
// });

// // Start server
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();


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

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
// const allowedOrigins = [
//   'http://localhost:3000', // your frontend in dev
//   process.env.CORS_ORIGIN
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
// }));

// const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:3000';
// const allowedOrigins = rawOrigins.split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: false  
}));

// preflight
app.options("*", cors());

// // dynamic origin check
// const corsOptions = {
//   origin: function(origin, callback) {
//     // allow requests with no origin (mobile apps, Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) return callback(null, true);
//     callback(new Error('Not allowed by CORS'));
//   },
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   credentials: true,
//   allowedHeaders: ['Content-Type','Authorization','Accept','Origin','X-Requested-With']
// };



// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // explicitly handle preflight
// app.options('*', cors());

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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);
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
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
