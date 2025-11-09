import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  name, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getColorFromName = (name) => {
    if (!name) return 'bg-gray-500';
    
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  if (src) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <img
          src={src}
          alt={name || 'User avatar'}
          className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className={`${sizeClasses[size]} rounded-full ${bgColor} flex items-center justify-center text-white font-semibold border-2 border-white shadow-sm`}
          style={{ display: 'none' }}
        >
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${className} rounded-full ${bgColor} flex items-center justify-center text-white font-semibold border-2 border-white shadow-sm`}
    >
      {initials}
    </div>
  );
};

export default Avatar;