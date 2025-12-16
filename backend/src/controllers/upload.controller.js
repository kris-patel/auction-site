/**
 * Upload Controller
 * Handles file uploads to Cloudinary (profile images and auction images)
 */

import prisma from '../config/database.js';
import { deleteImage } from '../config/cloudinary.js';

/**
 * Upload profile image for authenticated user
 * Deletes old image before uploading new one
 */
export const uploadProfileImage = async (req, res) => {
  try {
    console.log('Upload profile image request received');
    console.log('File:', req.file);
    console.log('User:', req.user);

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const userId = req.user.id;
    const imageUrl = req.file.path; // Cloudinary URL from multer

    console.log('Image URL from Cloudinary:', imageUrl);

    // Get user's old profile image
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImage: true }
    });

    // Update user profile image
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageUrl },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profileImage: true
      }
    });

    console.log('Updated user:', updatedUser);

    // Delete old image from Cloudinary
    if (user.profileImage) {
      const publicId = extractPublicId(user.profileImage);
      if (publicId) {
        await deleteImage(publicId);
      }
    }

    res.json({
      message: 'Profile image uploaded successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Upload profile image error:', error);
    res.status(500).json({ 
      error: 'Failed to upload profile image',
      details: error.message 
    });
  }
};

/**
 * Upload multiple images for an auction
 * First uploaded image is set as primary by default
 */
export const uploadAuctionImages = async (req, res) => {
  try {
    console.log('Upload auction images request received');
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    console.log('User:', req.user);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const { auctionId } = req.body;
    const sellerId = req.user.id;

    if (!auctionId) {
      return res.status(400).json({ error: 'Auction ID is required' });
    }

    console.log('Auction ID:', auctionId);

    // Verify auction belongs to seller
    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId },
      select: { sellerId: true }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (auction.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Get current max display order for proper sequencing
    const lastImage = await prisma.auctionImage.findFirst({
      where: { auctionId },
      orderBy: { displayOrder: 'desc' }
    });

    const startOrder = lastImage ? lastImage.displayOrder + 1 : 0;

    // Create image records with sequential display order
    const imageRecords = req.files.map((file, index) => ({
      auctionId,
      imageUrl: file.path,
      displayOrder: startOrder + index,
      isPrimary: startOrder === 0 && index === 0 // First image is primary
    }));

    console.log('Creating image records:', imageRecords);

    await prisma.auctionImage.createMany({
      data: imageRecords
    });

    // Get all images for this auction
    const allImages = await prisma.auctionImage.findMany({
      where: { auctionId },
      orderBy: { displayOrder: 'asc' }
    });

    console.log('All images after upload:', allImages);

    res.json({
      message: 'Images uploaded successfully',
      images: allImages
    });
  } catch (error) {
    console.error('Upload auction images error:', error);
    res.status(500).json({ 
      error: 'Failed to upload images',
      details: error.message 
    });
  }
};

/**
 * Delete an auction image
 * Removes from database and Cloudinary, reassigns primary if needed
 */
export const deleteAuctionImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const sellerId = req.user.id;

    // Get image with auction info
    const image = await prisma.auctionImage.findUnique({
      where: { id: imageId },
      include: {
        auction: {
          select: { sellerId: true }
        }
      }
    });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Verify seller owns the auction
    if (image.auction.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete from Cloudinary
    const publicId = extractPublicId(image.imageUrl);
    if (publicId) {
      await deleteImage(publicId);
    }

    // If deleting primary image, make next image primary
    if (image.isPrimary) {
      const nextImage = await prisma.auctionImage.findFirst({
        where: {
          auctionId: image.auctionId,
          id: { not: imageId }
        },
        orderBy: { displayOrder: 'asc' }
      });

      if (nextImage) {
        await prisma.auctionImage.update({
          where: { id: nextImage.id },
          data: { isPrimary: true }
        });
      }
    }

    // Delete from database
    await prisma.auctionImage.delete({
      where: { id: imageId }
    });

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete auction image error:', error);
    res.status(500).json({ 
      error: 'Failed to delete image',
      details: error.message 
    });
  }
};

/**
 * Set an image as primary for an auction
 * Unsets current primary and sets new one
 */
export const setPrimaryImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const sellerId = req.user.id;

    // Get image with auction info
    const image = await prisma.auctionImage.findUnique({
      where: { id: imageId },
      include: {
        auction: {
          select: { sellerId: true, id: true }
        }
      }
    });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Verify seller owns the auction
    if (image.auction.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update all images for this auction in transaction
    await prisma.$transaction([
      // Unset all primary flags
      prisma.auctionImage.updateMany({
        where: { auctionId: image.auctionId },
        data: { isPrimary: false }
      }),
      // Set this image as primary
      prisma.auctionImage.update({
        where: { id: imageId },
        data: { isPrimary: true }
      })
    ]);

    res.json({ message: 'Primary image updated successfully' });
  } catch (error) {
    console.error('Set primary image error:', error);
    res.status(500).json({ 
      error: 'Failed to set primary image',
      details: error.message 
    });
  }
};

/**
 * Helper function to extract Cloudinary public ID from URL
 * Format: https://res.cloudinary.com/{cloud}/image/upload/{folder}/{id}.{ext}
 */
const extractPublicId = (url) => {
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const publicIdWithFormat = filename.split('.')[0];
    
    // Extract folder path from URL
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex !== -1 && uploadIndex + 2 < parts.length) {
      const folder = parts.slice(uploadIndex + 1, -1).join('/');
      return `${folder}/${publicIdWithFormat}`;
    }
    
    return publicIdWithFormat;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};