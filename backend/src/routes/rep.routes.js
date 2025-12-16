/**
 * ============================================
 * rep.routes.js
 * ============================================
 * Routes for customer representative operations
 * Handles user support and auction moderation
 */

import express from 'express';
import {
  getAllUsers,
  getAllAuctions,
  resetPassword,
  getUserDetails,
  deleteAuction, 
  approveAuction,
  updateAuctionStatus
} from '../controllers/rep.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdminOrRep } from '../middleware/roleCheck.js';

const router = express.Router();

// Apply authentication and rep/admin role check to all routes
router.use(authenticateToken, requireAdminOrRep);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.post('/users/:userId/reset-password', resetPassword);

// Auction management routes
router.get('/auctions', getAllAuctions);
router.delete('/auction/:auctionId', deleteAuction);

// Auction approval and status management
router.post('/auction/:auctionId/approve', approveAuction);
router.patch('/auction/:auctionId/status', updateAuctionStatus);

export default router;