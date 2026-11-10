import React, { useState } from 'react';
import { CreditCard, X, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('ACTIVE');
  const [updating, setUpdating] = useState(false);

  if (!isOpen) return null;

  const toggleStatus = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setStatus(prev => prev === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Tenant Subscription Governance</h3>
              <p className="text-xs text-gray-500">Apex Global University • Enterprise Plan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-lg border space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Tenant Code:</span>
              <span className="font-mono font-bold text-blue-600">TENANT-UNICORE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Subscription Plan:</span>
              <span className="font-bold text-purple-600">Multi-Campus Enterprise License</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Max Allowed Users:</span>
              <span className="font-bold text-gray-900">Unlimited Students & Staff</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="font-semibold text-gray-600">License Status:</span>
              <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {status}
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
            <span className="text-amber-800 font-semibold">Tenant Governance Action:</span>
            <button
              onClick={toggleStatus}
              disabled={updating}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition ${
                status === 'ACTIVE'
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {updating ? 'Updating...' : status === 'ACTIVE' ? 'Suspend Tenant' : 'Activate Tenant'}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
