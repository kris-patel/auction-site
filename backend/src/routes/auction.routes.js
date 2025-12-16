/**
 * ============================================
 * auction.routes.js
 * ============================================
 * Routes for auction operations
 * Handles CRUD operations and status management
 */

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
import { requireSeller, requireRole } from '../middleware/roleCheck.js';
import { updateExpiredAuctions } from '../services/auctionStatus.service.js';

const router = express.Router();

// Public/authenticated routes
router.get('/active', getActiveAuctions);
router.get('/by-status', authenticateToken, getAuctionsByStatus);
router.get('/:id', authenticateToken, getAuctionById);

// Seller-only routes
router.post('/', authenticateToken, requireSeller, createAuction);
router.get('/seller/mine', authenticateToken, requireSeller, getMyAuctions);

// Update and delete routes (sellers can modify own, reps can modify any)
router.put('/:id', authenticateToken, updateAuction);
router.delete('/:id', authenticateToken, requireRole('seller', 'rep'), deleteAuction);

// Manual status update endpoint (Admin/Rep only)
// Closes expired active auctions (does NOT approve pending ones)
router.post('/update-statuses', 
  authenticateToken, 
  requireRole('admin', 'rep'), 
  async (req, res) => {
    try {
      const result = await updateExpiredAuctions();
      res.json({ 
        success: true, 
        message: 'Expired auctions closed successfully',
        closedCount: result.count
      });
    } catch (error) {
      console.error('Error updating statuses:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to close expired auctions',
        error: error.message 
      });
    }
  }
);

export default router;