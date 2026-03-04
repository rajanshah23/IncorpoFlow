import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="w-10 h-10 border-3 border-gray-200 border-t-[#0a1929] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;