// ============================================
// Card.jsx
// ============================================
/**
 * Card - Container component with white background and shadow
 * Used as a wrapper for content sections
 */

import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);