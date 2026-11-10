import React from 'react';

const PageLoader = ({ message = "Loading content..." }) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center space-y-3 bg-white/50 rounded-xl border border-gray-100">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-gray-200 border-t-blue-600 animate-spin"></div>
        <div className="absolute w-7 h-7 bg-navy-800 rounded-lg flex items-center justify-center text-xs font-bold text-white">
          U
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-600 tracking-wide">{message}</p>
    </div>
  );
};

export default PageLoader;
