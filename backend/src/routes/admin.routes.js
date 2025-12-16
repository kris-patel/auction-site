/**
 * ============================================
 * admin.routes.js
 * ============================================
 * Routes for admin-only operations
 * Handles user/rep/admin creation and management
 */

import express from 'express';
import {
  createRep,
  createAdmin,
  getAllUsers,
  deactivateUser,
  activateUser,
  deleteUser,
  getAllAuctions
} from '../controllers/admin.controller.js';
import { approveAuction } from '../controllers/auction.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

// Apply authentication and admin role check to all routes
router.use(authenticateToken, requireAdmin);

// User management routes
router.post('/create-rep', createRep);
router.post('/create-admin', createAdmin);
router.get('/users', getAllUsers);
router.patch('/users/:id/deactivate', deactivateUser);
router.patch('/users/:id/activate', activateUser);
router.delete('/users/:id', deleteUser);

// Auction management routes
router.get('/auctions', getAllAuctions);
router.patch('/auctions/:id/approve', approveAuction);

export default router;