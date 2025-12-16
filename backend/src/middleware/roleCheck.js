/**
 * Role-Based Access Control Middleware
 * Restricts route access based on user roles
 */

/**
 * Higher-order function that creates middleware for role-based authorization
 * Checks if authenticated user has one of the allowed roles
 * 
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Express middleware function
 * 
 * @example
 * router.get('/admin-only', requireRole('admin'), adminController)
 * router.get('/staff-only', requireRole('admin', 'rep'), staffController)
 */
export const requireRole = (...allowedRoles) => {
  console.log('requireRole called with:', allowedRoles);
  
  return (req, res, next) => {
    console.log('Middleware executing - allowedRoles:', allowedRoles); 
    console.log('User attempting access:', req.user);
    
    // Check if user is authenticated (set by authenticateToken middleware)
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if user's role is in the allowed roles list
    if (!allowedRoles.includes(req.user.role)) {
      console.log(`Access denied: ${req.user.role} not in`, allowedRoles); 
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }

    console.log('Access granted!'); 
    next();
  };
};

// Predefined role middleware for common use cases
export const requireBuyer = requireRole('buyer');
export const requireSeller = requireRole('seller');
export const requireRep = requireRole('rep');
export const requireAdmin = requireRole('admin');
export const requireAdminOrRep = requireRole('admin', 'rep');