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

// Profile image upload
router.post(
  '/profile',
  authenticateToken,
  uploadProfile.single('image'),
  uploadProfileImage
);

// Auction images upload (multiple)
router.post(
  '/auction',
  authenticateToken,
  uploadAuction.array('images', 5), // Max 5 images at once
  uploadAuctionImages
);

// Delete auction image
router.delete(
  '/auction/:imageId',
  authenticateToken,
  deleteAuctionImage
);

// Set primary image
router.patch(
  '/auction/:imageId/primary',
  authenticateToken,
  setPrimaryImage
);

export default router;