// export const requireRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ error: 'Authentication required' });
//     }

//     console.log(allowedRoles);
//     console.log(req.user);

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ 
//         error: 'Access denied. Insufficient permissions.' 
//       });
//     }

//     next();
//   };
// };

export const requireRole = (...allowedRoles) => {
  console.log('requireRole called with:', allowedRoles); // Add this line
  return (req, res, next) => {
    console.log('Middleware executing - allowedRoles:', allowedRoles); // Add this line
    console.log('User attempting access:', req.user);
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log(`Access denied: ${req.user.role} not in`, allowedRoles); // Add this line
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }

    console.log('Access granted!'); // Add this line
    next();
  };
};

// Specific role checkers for convenience
export const requireBuyer = requireRole('buyer');
export const requireSeller = requireRole('seller');
export const requireRep = requireRole('rep');
export const requireAdmin = requireRole('admin');
export const requireAdminOrRep = requireRole('admin', 'rep');