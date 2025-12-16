/**
 * ============================================
 * cloudinary.js
 * ============================================
 * Cloudinary configuration for image uploads
 * Configures multer storage and upload limits
 */

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage configuration for profile images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'auction-platform/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// Storage configuration for auction images
const auctionStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'auction-platform/auctions',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
  }
});

// Multer instance for profile image uploads (single file, 5MB limit)
export const uploadProfile = multer({
  storage: profileStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// Multer instance for auction image uploads (multiple files, 5MB per file)
export const uploadAuction = multer({
  storage: auctionStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

/**
 * Delete image from Cloudinary by public ID
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export default cloudinary;