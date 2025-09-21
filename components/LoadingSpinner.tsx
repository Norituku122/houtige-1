
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <svg 
      className="animate-spin h-8 w-8 text-purple-500" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2L9.93934 9.93934L2 12L9.93934 14.0607L12 22L14.0607 14.0607L22 12L14.0607 9.93934L12 2Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round" 
        strokeLinecap="round" 
        fill="rgba(248, 187, 208, 0.7)"
      />
    </svg>
  );
};

export default LoadingSpinner;