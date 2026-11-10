import React from 'react';
import { useLoading } from '../../hooks/useLoading';

const GlobalLoader = () => {
  const { isGlobalLoading, customLoadingMessage, customLoadingSubtext } = useLoading();

  if (!isGlobalLoading) return null;

  const titleText = customLoadingMessage || "University ERP is processing...";
  const subtext = customLoadingSubtext || "Please wait while we prepare your workspace.";

  return (
    <div
      className="fixed inset-0 z-40 bg-navy-950/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Processing action"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 flex flex-col items-center text-center space-y-4 transform transition-all scale-100">
        <div className="relative flex items-center justify-center">
          {/* Rotating outer spinner ring */}
          <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 border-r-teal-500 animate-spin"></div>

          {/* Inner Logo Badge */}
          <div className="absolute w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md">
            U
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 leading-snug">{titleText}</h4>
          <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 h-full w-2/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
