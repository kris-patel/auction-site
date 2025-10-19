import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', authenticateToken, getProfile);

export default router;