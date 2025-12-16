/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user data to request object
 */

import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware to authenticate requests using JWT token
 * Extracts token from Authorization header (Bearer scheme)
 * Attaches decoded user data to req.user for use in route handlers
 * 
 * @middleware
 * @requires Authorization header with format: "Bearer <token>"
 */
export const authenticateToken = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify and decode token
    const decoded = verifyToken(token);
    
    // Attach user data to request object for downstream use
    req.user = decoded; // Contains: { id, email, role }
    
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};