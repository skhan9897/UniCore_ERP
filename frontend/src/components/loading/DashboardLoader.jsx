import React from 'react';
import CardSkeleton from './CardSkeleton';

const DashboardLoader = () => {
  return (
    <div className="space-y-6 w-full animate-fadeIn">
      {/* Header Banner Skeleton */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-6 w-64 skeleton-shimmer rounded-lg"></div>
          <div className="h-4 w-96 skeleton-shimmer rounded"></div>
        </div>
        <div className="h-9 w-32 skeleton-shimmer rounded-lg"></div>
      </div>

      {/* Metric Cards Skeleton */}
      <CardSkeleton count={4} />

      {/* Main Panels Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="h-5 w-48 skeleton-shimmer rounded"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100">
                <div className="h-3 w-16 skeleton-shimmer rounded"></div>
                <div className="h-6 w-12 skeleton-shimmer rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="h-5 w-40 skeleton-shimmer rounded"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 skeleton-shimmer rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
