import React from 'react';

const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="h-8 w-64 skeleton-shimmer rounded-lg"></div>
        <div className="h-8 w-24 skeleton-shimmer rounded-lg"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 w-20 skeleton-shimmer rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, rIdx) => (
              <tr key={rIdx}>
                {Array.from({ length: columns }).map((_, cIdx) => (
                  <td key={cIdx} className="px-6 py-4">
                    <div className="h-4 w-full skeleton-shimmer rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
