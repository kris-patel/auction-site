export const requireRole = (...allowedRoles) => {
  console.log('requireRole called with:', allowedRoles);
  return (req, res, next) => {
    console.log('Middleware executing - allowedRoles:', allowedRoles); 
    console.log('User attempting access:', req.user);
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

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

export const requireBuyer = requireRole('buyer');
export const requireSeller = requireRole('seller');
export const requireRep = requireRole('rep');
export const requireAdmin = requireRole('admin');
export const requireAdminOrRep = requireRole('admin', 'rep');