// import express from 'express';
// import {
//   getActiveAuctions,
//   getAuctionById,
//   createAuction,
//   getMyAuctions,
//   updateAuction,
//   deleteAuction
// } from '../controllers/auction.controller.js';
// import { authenticateToken } from '../middleware/auth.js';
// import { requireSeller } from '../middleware/roleCheck.js';

// const router = express.Router();

// // Public/authenticated routes
// router.get('/active', getActiveAuctions);
// router.get('/:id', authenticateToken, getAuctionById);

// // Seller-only routes
// router.post('/', authenticateToken, requireSeller, createAuction);
// router.get('/seller/mine', authenticateToken, requireSeller, getMyAuctions);
// router.patch('/:id', authenticateToken, requireSeller, updateAuction);
// router.delete('/:id', authenticateToken, requireSeller, deleteAuction);

// export default router;

import express from 'express';
import {
  getActiveAuctions,
  getAuctionById,
  createAuction,
  getMyAuctions,
  updateAuction,
  deleteAuction,
  getAuctionsByStatus
} from '../controllers/auction.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireSeller } from '../middleware/roleCheck.js';

const router = express.Router();

// Public/authenticated routes
router.get('/active', getActiveAuctions);
router.get('/by-status', authenticateToken, getAuctionsByStatus); // NEW: Filter by status
router.get('/:id', authenticateToken, getAuctionById);

// Seller-only routes
router.post('/', authenticateToken, requireSeller, createAuction);
router.get('/seller/mine', authenticateToken, requireSeller, getMyAuctions); // Supports ?status=pending|active|completed
router.patch('/:id', authenticateToken, requireSeller, updateAuction);
router.delete('/:id', authenticateToken, requireSeller, deleteAuction);

export default router;