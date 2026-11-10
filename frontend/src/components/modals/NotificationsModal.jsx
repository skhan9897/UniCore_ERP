import React from 'react';
import { Bell, CheckCircle, AlertCircle, Calendar, CreditCard, X } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, title: 'Fee Collection Verified', desc: '$1,200 collected for Sarah Jenkins', time: '5m ago', icon: CreditCard, color: 'text-emerald-600 bg-emerald-100' },
  { id: 2, title: 'Admit Cards Generated', desc: 'Fall 2026 Mid-Term exam hall passes issued', time: '1h ago', icon: Calendar, color: 'text-amber-600 bg-amber-100' },
  { id: 3, title: 'Shortage Alert', desc: '14 students flagged with attendance below 75%', time: '2h ago', icon: AlertCircle, color: 'text-rose-600 bg-rose-100' },
];

const NotificationsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-6 top-16 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
      <div className="p-3.5 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">System Notifications</h4>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
        {NOTIFICATIONS.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="p-3 hover:bg-gray-50 transition flex items-start gap-3">
              <div className={`p-2 rounded-lg flex-shrink-0 ${n.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold text-gray-900 truncate">{n.title}</p>
                  <span className="text-[10px] text-gray-400 font-mono">{n.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{n.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-2.5 bg-gray-50 border-t text-center">
        <button onClick={onClose} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">
          Mark All as Read
        </button>
      </div>
    </div>
  );
};

export default NotificationsModal;
