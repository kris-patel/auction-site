// import express from 'express';
// import { register, login, getProfile } from '../controllers/auth.controller.js';
// import { 
//   updateProfileImage, 
//   updateUsername, 
//   updatePassword 
// } from '../controllers/profile.controller.js';
// import { authenticateToken } from '../middleware/auth.js';

// const router = express.Router();

// // Public routes
// router.post('/register', register);
// router.post('/login', login);

// // Protected route
// router.get('/profile', authenticateToken, getProfile);

// router.put('/profile/image', authenticateToken,  updateProfileImage);
// // uploadProfile.single('image'),
// router.put('/profile/username', authenticateToken, updateUsername);
// router.put('/profile/password', authenticateToken, updatePassword);

// export default router;

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

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', authenticateToken, getProfile);

// ✅ FIXED: Added uploadProfile.single('image') middleware
router.put('/profile/image', authenticateToken, uploadProfile.single('image'), updateProfileImage);
router.put('/profile/username', authenticateToken, updateUsername);
router.put('/profile/password', authenticateToken, updatePassword);

export default router;