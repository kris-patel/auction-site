// import prisma from '../config/database.js';
// import { hashPassword, comparePassword } from '../utils/bcrypt.js';
// import { deleteImage } from '../config/cloudinary.js';

// // Update profile image
// export const updateProfileImage = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Check if file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image file provided' });
//     }

//     // Get current user to check for existing profile image
//     const currentUser = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { profileImage: true }
//     });

//     // Delete old image from Cloudinary if it exists
//     if (currentUser.profileImage) {
//       // Extract public_id from Cloudinary URL
//       const urlParts = currentUser.profileImage.split('/');
//       const publicIdWithExtension = urlParts[urlParts.length - 1];
//       const publicId = `auction-platform/profiles/${publicIdWithExtension.split('.')[0]}`;
//       await deleteImage(publicId);
//     }

//     // Update user with new image URL
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { profileImage: req.file.path },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         profileImage: true
//       }
//     });

//     res.json({
//       message: 'Profile image updated successfully',
//       imageUrl: updatedUser.profileImage,
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error('Update profile image error:', error);
//     res.status(500).json({ error: 'Failed to update profile image' });
//   }
// };

// // Update username
// export const updateUsername = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { username } = req.body;

//     // Validate input
//     if (!username || !username.trim()) {
//       return res.status(400).json({ error: 'Username is required' });
//     }

//     // Check if username is already taken by another user
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         username: username.trim(),
//         NOT: { id: userId }
//       }
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: 'Username is already taken' });
//     }

//     // Update username
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { username: username.trim() },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         profileImage: true
//       }
//     });

//     res.json({
//       message: 'Username updated successfully',
//       username: updatedUser.username,
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error('Update username error:', error);
//     res.status(500).json({ error: 'Failed to update username' });
//   }
// };

// // Update password
// export const updatePassword = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { currentPassword, newPassword } = req.body;

//     // Validate input
//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ 
//         error: 'Current password and new password are required' 
//       });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ 
//         error: 'New password must be at least 6 characters long' 
//       });
//     }

//     // Get current user with password
//     const user = await prisma.user.findUnique({
//       where: { id: userId }
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Verify current password
//     const isPasswordValid = await comparePassword(currentPassword, user.password);
    
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Current password is incorrect' });
//     }

//     // Check if new password is different from current
//     const isSamePassword = await comparePassword(newPassword, user.password);
//     if (isSamePassword) {
//       return res.status(400).json({ 
//         error: 'New password must be different from current password' 
//       });
//     }

//     // Hash new password
//     const hashedPassword = await hashPassword(newPassword);

//     // Update password
//     await prisma.user.update({
//       where: { id: userId },
//       data: { password: hashedPassword }
//     });

//     res.json({
//       message: 'Password updated successfully'
//     });
//   } catch (error) {
//     console.error('Update password error:', error);
//     res.status(500).json({ error: 'Failed to update password' });
//   }
// };

import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { deleteImage } from '../config/cloudinary.js';

// Update profile image
export const updateProfileImage = async (req, res) => {
  try {
    console.log('=== Update Profile Image ===');
    console.log('File:', req.file);
    console.log('User ID:', req.user?.id);

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const userId = req.user.id;
    const imageUrl = req.file.path; // Cloudinary URL

    console.log('New image URL:', imageUrl);

    // Get current user to check for existing profile image
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImage: true }
    });

    // Delete old image from Cloudinary if it exists
    if (currentUser?.profileImage) {
      try {
        const publicId = extractPublicId(currentUser.profileImage);
        if (publicId) {
          console.log('Deleting old image:', publicId);
          await deleteImage(publicId);
        }
      } catch (error) {
        console.error('Error deleting old image:', error);
        // Continue even if deletion fails
      }
    }

    // Update user with new image URL
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

    console.log('Profile image updated successfully');

    res.json({
      message: 'Profile image updated successfully',
      imageUrl: updatedUser.profileImage,
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile image error:', error);
    res.status(500).json({ 
      error: 'Failed to update profile image',
      details: error.message 
    });
  }
};

// Update username
export const updateUsername = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;

    // Validate input
    if (!username || !username.trim()) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Check if username is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        username: username.trim(),
        NOT: { id: userId }
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Update username
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username: username.trim() },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profileImage: true
      }
    });

    res.json({
      message: 'Username updated successfully',
      username: updatedUser.username,
      user: updatedUser
    });
  } catch (error) {
    console.error('Update username error:', error);
    res.status(500).json({ error: 'Failed to update username' });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: 'New password must be at least 6 characters long' 
      });
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Check if new password is different from current
    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ 
        error: 'New password must be different from current password' 
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.json({
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
};

// Helper function to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{folder}/{public_id}.{format}
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const publicIdWithFormat = filename.split('.')[0];
    
    // Find the folder path (auction-platform/profiles)
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex !== -1 && uploadIndex + 2 < parts.length) {
      const folder = parts.slice(uploadIndex + 1, -1).join('/');
      return `${folder}/${publicIdWithFormat}`;
    }
    
    return `auction-platform/profiles/${publicIdWithFormat}`;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};