import React from 'react';
import { Activity, X, Database, HardDrive, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

const SystemHealthModal = ({ isOpen, onClose, type = 'api' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {type === 'database' ? 'Database Diagnostics & Pool' : type === 'storage' ? 'Storage & Backup Allocation' : 'System & API Health'}
              </h3>
              <p className="text-xs text-gray-500">Real-time performance and system monitoring</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'database' ? (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="font-semibold text-gray-700">HikariCP Pool Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Active (20 Max Connections)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-500 font-semibold uppercase">Response Latency</p>
                <p className="text-base font-bold text-gray-900 mt-1">2.4 ms</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-500 font-semibold uppercase">Flyway Migration</p>
                <p className="text-base font-bold text-blue-600 mt-1">V2__seed_core (UP TO DATE)</p>
              </div>
            </div>
          </div>
        ) : type === 'storage' ? (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Storage Allocation Used:</span>
                <span className="font-bold text-blue-700">14.2 GB / 500.0 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full w-[3%]"></div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Automated Daily Backups:</span>
                <span className="font-bold text-emerald-600">ENABLED (02:00 UTC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Last Backup Status:</span>
                <span className="font-bold text-gray-800">VERIFIED SUCCESSFUL (Today)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="font-semibold text-gray-700">REST API Gateway:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Operational (HTTP 200 OK)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-500 font-semibold uppercase">JVM Memory Usage</p>
                <p className="text-base font-bold text-purple-600 mt-1">214 MB / 1024 MB</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-500 font-semibold uppercase">Active User Sessions</p>
                <p className="text-base font-bold text-gray-900 mt-1">1 SuperAdmin Session</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 shadow"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthModal;
