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
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

// All routes require admin role
router.use(authenticateToken, requireAdmin);

// User management
router.post('/create-rep', createRep);
router.post('/create-admin', createAdmin);
router.get('/users', getAllUsers);
router.patch('/users/:id/deactivate', deactivateUser);
router.patch('/users/:id/activate', activateUser);
router.delete('/users/:id', deleteUser);

// Auction management
router.get('/auctions', getAllAuctions);

export default router;