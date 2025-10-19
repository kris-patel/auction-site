import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ children, variant = 'info' }) => {
  const colors = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[variant]} flex items-start gap-2`}>
      <AlertCircle className="w-5 h-5 mt-0.5" />
      <div>{children}</div>
    </div>
  );
};



