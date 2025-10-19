export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

// Specific role checkers for convenience
export const requireBuyer = requireRole('buyer');
export const requireSeller = requireRole('seller');
export const requireRep = requireRole('rep');
export const requireAdmin = requireRole('admin');
export const requireAdminOrRep = requireRole('admin', 'rep');