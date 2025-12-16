/**
 * ============================================
 * bid.routes.js
 * ============================================
 * Routes for bidding operations
 * Handles bid placement and retrieval
 */

import express from 'express';
import {
  placeBid,
  getAuctionBids,
  getMyBids
} from '../controllers/bid.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireBuyer } from '../middleware/roleCheck.js';

const router = express.Router();

// Get user's own bids (must come BEFORE parameterized routes to avoid conflict)
router.get('/my-bids', authenticateToken, requireBuyer, getMyBids);

// Place bid on auction (buyer only)
router.post('/:auctionId', authenticateToken, requireBuyer, placeBid);

// Get all bids for specific auction (authenticated users)
router.get('/:auctionId', authenticateToken, getAuctionBids);

export default router;