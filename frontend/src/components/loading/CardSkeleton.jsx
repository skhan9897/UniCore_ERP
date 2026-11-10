import React from 'react';

const CardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-3 w-24 skeleton-shimmer rounded"></div>
            <div className="h-10 w-10 skeleton-shimmer rounded-xl"></div>
          </div>
          <div className="h-7 w-20 skeleton-shimmer rounded"></div>
          <div className="h-3 w-32 skeleton-shimmer rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
