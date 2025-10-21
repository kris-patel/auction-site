// import express from 'express';
// import {
//   placeBid,
//   getAuctionBids,
//   getMyBids
// } from '../controllers/bid.controller.js';
// import { authenticateToken } from '../middleware/auth.js';
// import { requireBuyer } from '../middleware/roleCheck.js';

// const router = express.Router();

// // Buyer-only routes
// router.post('/:auctionId', authenticateToken, requireBuyer, placeBid);
// router.get('/my-bids', authenticateToken, requireBuyer, getMyBids);

// // Authenticated routes (any role)
// router.get('/auction/:auctionId', authenticateToken, getAuctionBids);

// export default router;

import express from 'express';
import {
  placeBid,
  getAuctionBids,
  getMyBids
} from '../controllers/bid.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireBuyer } from '../middleware/roleCheck.js';

const router = express.Router();

// Authenticated routes (any role) - must come BEFORE parameterized routes
router.get('/my-bids', authenticateToken, requireBuyer, getMyBids);

// Buyer-only routes
router.post('/:auctionId', authenticateToken, requireBuyer, placeBid);

// Get bids for an auction - authenticated
router.get('/:auctionId', authenticateToken, getAuctionBids);

export default router;