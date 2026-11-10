import React, { useEffect, useState } from 'react';
import { Shield, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

const MESSAGES = [
  "Initializing University ERP...",
  "Loading Application Services...",
  "Connecting to Secure Gateway...",
  "Preparing Your Enterprise Workspace...",
  "Almost Ready..."
];

const SplashScreen = ({ connectionError, onRetry, isComplete }) => {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (connectionError) return;

    // Cycle messages & simulate progress bar smoothly up to 90% while initialization runs
    const msgInterval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 15 : 90));
    }, 350);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [connectionError]);

  useEffect(() => {
    if (isComplete && !connectionError) {
      setProgress(100);
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isComplete, connectionError]);

  if (fadeOut) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex flex-col items-center justify-between p-8 text-white transition-opacity duration-500 ${
        isComplete && !connectionError ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="region"
      aria-label="Application Startup Splash Screen"
    >
      <div className="w-full flex items-center justify-between max-w-5xl opacity-80">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-xs tracking-wider uppercase font-semibold text-blue-300">
            Multi-Tenant Enterprise Platform
          </span>
        </div>
        <div className="text-xs font-mono text-gray-400">v1.0.0</div>
      </div>

      <div className="flex flex-col items-center text-center my-auto max-w-md w-full">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 blur-xl opacity-60 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center text-5xl font-black text-white shadow-2xl border border-blue-400/30 animate-pulse-glow">
            U
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          UNIVERSITY <span className="text-blue-400">ERP</span>
        </h1>
        <p className="text-sm font-medium text-blue-200/90 tracking-wide mb-8">
          Smart Campus. Seamless Management.
        </p>

        {connectionError ? (
          <div className="w-full bg-red-950/60 border border-red-500/40 rounded-xl p-5 backdrop-blur-sm text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>Service Connection Failed</span>
            </div>
            <p className="text-xs text-red-200">
              {connectionError.message || "Unable to connect to backend services. Please check server availability."}
            </p>
            <button
              onClick={onRetry}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg transition focus:ring-2 focus:ring-white"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : (
          <div className="w-full space-y-3">
            <div className="h-1.5 w-full bg-navy-950/80 rounded-full overflow-hidden p-0.5 border border-navy-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-royal-500 to-teal-400 rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-blue-200/70 font-medium px-1">
              <span className="truncate">{MESSAGES[currentMsgIndex]}</span>
              <span className="font-mono text-blue-300 ml-2">{progress}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>© 2026 UniCore ERP Platform. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
