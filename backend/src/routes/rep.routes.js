import express from 'express';
import {
  getAllUsers,
  resetPassword,
  deleteAuction,
  getUserDetails
} from '../controllers/rep.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRep } from '../middleware/roleCheck.js';

const router = express.Router();

// All routes require rep role
router.use(authenticateToken, requireRep);

// User management
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.patch('/reset-password/:userId', resetPassword);

// Auction management
router.delete('/auction/:auctionId', deleteAuction);

export default router;