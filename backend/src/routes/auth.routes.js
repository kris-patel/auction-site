/**
 * ============================================
 * auth.routes.js
 * ============================================
 * Routes for authentication and profile management
 * Handles registration, login, and profile updates
 */

import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { 
  updateProfileImage, 
  updateUsername, 
  updatePassword 
} from '../controllers/profile.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadProfile } from '../config/cloudinary.js';

const router = express.Router();

// Public authentication routes
router.post('/register', register);
router.post('/login', login);

// Protected profile routes
router.get('/profile', authenticateToken, getProfile);

// Profile update routes (authenticated)
router.put('/profile/image', authenticateToken, uploadProfile.single('image'), updateProfileImage);
router.put('/profile/username', authenticateToken, updateUsername);
router.put('/profile/password', authenticateToken, updatePassword);

export default router;