/**
 * ============================================
 * upload.routes.js
 * ============================================
 * Routes for file uploads to Cloudinary
 * Handles profile images and auction images
 */

import express from 'express';
import {
  uploadProfileImage,
  uploadAuctionImages,
  deleteAuctionImage,
  setPrimaryImage
} from '../controllers/upload.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadProfile, uploadAuction } from '../config/cloudinary.js';

const router = express.Router();

// Profile image upload (single file)
router.post(
  '/profile',
  authenticateToken,
  uploadProfile.single('image'), // Multer middleware for single file
  uploadProfileImage
);

// Auction images upload (multiple files, max 5)
router.post(
  '/auction',
  authenticateToken,
  uploadAuction.array('images', 5), // Multer middleware for multiple files
  uploadAuctionImages
);

// Delete specific auction image
router.delete(
  '/auction/:imageId',
  authenticateToken,
  deleteAuctionImage
);

// Set image as primary for auction
router.patch(
  '/auction/:imageId/primary',
  authenticateToken,
  setPrimaryImage
);

export default router;