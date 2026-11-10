import React from 'react';
import { useLoading } from '../../hooks/useLoading';
import { FileText, Download } from 'lucide-react';

const ExportLoader = () => {
  const { exportLoading, exportMessage } = useLoading();

  if (!exportLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
          <FileText className="w-6 h-6 text-emerald-600 absolute" />
        </div>

        <div>
          <h4 className="text-base font-bold text-gray-900">Generating Document</h4>
          <p className="text-xs text-gray-500 mt-1">{exportMessage || "Preparing PDF / Excel export..."}</p>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
          <Download className="w-3.5 h-3.5 animate-bounce" />
          <span>Processing export request...</span>
        </div>
      </div>
    </div>
  );
};

export default ExportLoader;
