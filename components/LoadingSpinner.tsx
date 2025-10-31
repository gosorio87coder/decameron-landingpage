import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#1856C5]"></div>
    </div>
  );
};

export default LoadingSpinner;
