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

// All routes require rep or admin role
router.use(authenticateToken, requireAdminOrRep);

// User management
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.post('/users/:userId/reset-password', resetPassword);

// Auction management
router.get('/auctions', getAllAuctions);
router.delete('/auction/:auctionId', deleteAuction); 

// Auction approval endpoints
router.post('/auction/:auctionId/approve', approveAuction);
router.patch('/auction/:auctionId/status', updateAuctionStatus);

export default router;