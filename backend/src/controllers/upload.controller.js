// import prisma from '../config/database.js';
// import { deleteImage } from '../config/cloudinary.js';

// // Upload profile image
// export const uploadProfileImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image file provided' });
//     }

//     const userId = req.user.id;
//     const imageUrl = req.file.path; // Cloudinary URL

//     // Get user's old profile image to delete it
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { profileImage: true }
//     });

//     // Update user profile image
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { profileImage: imageUrl },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         profileImage: true
//       }
//     });

//     // Delete old image from Cloudinary if it exists
//     if (user.profileImage) {
//       const publicId = extractPublicId(user.profileImage);
//       if (publicId) {
//         await deleteImage(publicId);
//       }
//     }

//     res.json({
//       message: 'Profile image uploaded successfully',
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error('Upload profile image error:', error);
//     res.status(500).json({ error: 'Failed to upload profile image' });
//   }
// };

// // Upload auction images
// export const uploadAuctionImages = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No image files provided' });
//     }

//     const { auctionId } = req.body;
//     const sellerId = req.user.id;

//     if (!auctionId) {
//       return res.status(400).json({ error: 'Auction ID is required' });
//     }

//     // Verify auction belongs to seller
//     const auction = await prisma.auctionItem.findUnique({
//       where: { id: auctionId },
//       select: { sellerId: true }
//     });

//     if (!auction) {
//       return res.status(404).json({ error: 'Auction not found' });
//     }

//     if (auction.sellerId !== sellerId) {
//       return res.status(403).json({ error: 'Not authorized' });
//     }

//     // Get current max display order
//     const lastImage = await prisma.auctionImage.findFirst({
//       where: { auctionId },
//       orderBy: { displayOrder: 'desc' }
//     });

//     const startOrder = lastImage ? lastImage.displayOrder + 1 : 0;

//     // Create image records
//     const imageRecords = req.files.map((file, index) => ({
//       auctionId,
//       imageUrl: file.path,
//       displayOrder: startOrder + index,
//       isPrimary: startOrder === 0 && index === 0 // First image is primary if no images exist
//     }));

//     await prisma.auctionImage.createMany({
//       data: imageRecords
//     });

//     // Get all images for this auction
//     const allImages = await prisma.auctionImage.findMany({
//       where: { auctionId },
//       orderBy: { displayOrder: 'asc' }
//     });

//     res.json({
//       message: 'Images uploaded successfully',
//       images: allImages
//     });
//   } catch (error) {
//     console.error('Upload auction images error:', error);
//     res.status(500).json({ error: 'Failed to upload images' });
//   }
// };

// // Delete auction image
// export const deleteAuctionImage = async (req, res) => {
//   try {
//     const { imageId } = req.params;
//     const sellerId = req.user.id;

//     // Get image with auction info
//     const image = await prisma.auctionImage.findUnique({
//       where: { id: imageId },
//       include: {
//         auction: {
//           select: { sellerId: true }
//         }
//       }
//     });

//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     if (image.auction.sellerId !== sellerId) {
//       return res.status(403).json({ error: 'Not authorized' });
//     }

//     // Delete from Cloudinary
//     const publicId = extractPublicId(image.imageUrl);
//     if (publicId) {
//       await deleteImage(publicId);
//     }

//     // If this was the primary image, make another image primary
//     if (image.isPrimary) {
//       const nextImage = await prisma.auctionImage.findFirst({
//         where: {
//           auctionId: image.auctionId,
//           id: { not: imageId }
//         },
//         orderBy: { displayOrder: 'asc' }
//       });

//       if (nextImage) {
//         await prisma.auctionImage.update({
//           where: { id: nextImage.id },
//           data: { isPrimary: true }
//         });
//       }
//     }

//     // Delete from database
//     await prisma.auctionImage.delete({
//       where: { id: imageId }
//     });

//     res.json({ message: 'Image deleted successfully' });
//   } catch (error) {
//     console.error('Delete auction image error:', error);
//     res.status(500).json({ error: 'Failed to delete image' });
//   }
// };

// // Set primary image
// export const setPrimaryImage = async (req, res) => {
//   try {
//     const { imageId } = req.params;
//     const sellerId = req.user.id;

//     // Get image with auction info
//     const image = await prisma.auctionImage.findUnique({
//       where: { id: imageId },
//       include: {
//         auction: {
//           select: { sellerId: true, id: true }
//         }
//       }
//     });

//     if (!image) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     if (image.auction.sellerId !== sellerId) {
//       return res.status(403).json({ error: 'Not authorized' });
//     }

//     // Update all images for this auction
//     await prisma.$transaction([
//       // Set all images to not primary
//       prisma.auctionImage.updateMany({
//         where: { auctionId: image.auctionId },
//         data: { isPrimary: false }
//       }),
//       // Set selected image as primary
//       prisma.auctionImage.update({
//         where: { id: imageId },
//         data: { isPrimary: true }
//       })
//     ]);

//     res.json({ message: 'Primary image updated successfully' });
//   } catch (error) {
//     console.error('Set primary image error:', error);
//     res.status(500).json({ error: 'Failed to set primary image' });
//   }
// };

// // Helper function to extract public ID from Cloudinary URL
// const extractPublicId = (url) => {
//   try {
//     const matches = url.match(/\/([^\/]+)\.(jpg|jpeg|png|webp)$/);
//     if (matches && matches[1]) {
//       return `auction-platform/profiles/${matches[1]}`;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error extracting public ID:', error);
//     return null;
//   }
// };

import prisma from '../config/database.js';
import { deleteImage } from '../config/cloudinary.js';

// Upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    console.log('Upload profile image request received');
    console.log('File:', req.file);
    console.log('User:', req.user);

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const userId = req.user.id;
    const imageUrl = req.file.path; // Cloudinary URL

    console.log('Image URL from Cloudinary:', imageUrl);

    // Get user's old profile image to delete it
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

    // Delete old image from Cloudinary if it exists
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

// Upload auction images
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

    // Get current max display order
    const lastImage = await prisma.auctionImage.findFirst({
      where: { auctionId },
      orderBy: { displayOrder: 'desc' }
    });

    const startOrder = lastImage ? lastImage.displayOrder + 1 : 0;

    // Create image records
    const imageRecords = req.files.map((file, index) => ({
      auctionId,
      imageUrl: file.path,
      displayOrder: startOrder + index,
      isPrimary: startOrder === 0 && index === 0
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

// Delete auction image
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

    if (image.auction.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete from Cloudinary
    const publicId = extractPublicId(image.imageUrl);
    if (publicId) {
      await deleteImage(publicId);
    }

    // If this was the primary image, make another image primary
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

// Set primary image
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

    if (image.auction.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update all images for this auction
    await prisma.$transaction([
      prisma.auctionImage.updateMany({
        where: { auctionId: image.auctionId },
        data: { isPrimary: false }
      }),
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

// Helper function to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{version}/{folder}/{public_id}.{format}
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const publicIdWithFormat = filename.split('.')[0];
    
    // Find the folder path (auction-platform/profiles or auction-platform/auctions)
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