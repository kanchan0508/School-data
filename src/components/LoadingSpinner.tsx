import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading schools...", 
  size = 'md',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerClass = fullScreen 
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200`}>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600"></div>
        </div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GraduationCap className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'} text-blue-600 animate-pulse`} />
        </div>
      </div>
      
      {/* Loading message */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 font-medium">{message}</p>
        <div className="flex items-center justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;