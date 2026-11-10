import React, { useState } from 'react';
import { CheckSquare, Plus, Search, AlertCircle, CheckCircle, Calendar, BarChart2 } from 'lucide-react';

const SUBJECT_ATTENDANCE = [
  { code: 'CS-401', subject: 'Advanced Distributed Systems', attended: 840, total: 880, percentage: '95.45%', status: 'GOOD' },
  { code: 'CS-302', subject: 'Database Management Systems', attended: 790, total: 840, percentage: '94.04%', status: 'GOOD' },
  { code: 'EE-201', subject: 'Digital Signal Processing', attended: 620, total: 700, percentage: '88.57%', status: 'GOOD' },
  { code: 'MB-104', subject: 'Financial Accounting & Analytics', attended: 510, total: 600, percentage: '85.00%', status: 'GOOD' },
];

const AttendanceManagement = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckSquare className="w-7 h-7 text-amber-600" />
            Attendance Monitoring & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">Average Attendance Rate: 94.2% • Configurable Threshold: 75%</p>
        </div>
        <button
          onClick={() => alert("Mark Class Attendance Dialog")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Mark Attendance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Overall Attendance Rate</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">94.2%</h3>
          <p className="text-xs text-gray-500 mt-1">Across all 14 departments</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Shortage Alerts Flagged</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">14 Students</h3>
          <p className="text-xs text-rose-600 font-medium mt-1">Below 75% mandatory threshold</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Biometric & QR Mode</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">Active Sync</h3>
          <p className="text-xs text-blue-600 font-medium mt-1">✓ Automated Attendance Logs</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-900">Subject-Wise Attendance Breakdown</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Subject Code</th>
                <th className="px-6 py-3">Subject Title</th>
                <th className="px-6 py-3">Classes Attended</th>
                <th className="px-6 py-3">Total Conducted</th>
                <th className="px-6 py-3">Attendance %</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SUBJECT_ATTENDANCE.map((sub) => (
                <tr key={sub.code} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-amber-700">{sub.code}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{sub.subject}</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">{sub.attended}</td>
                  <td className="px-6 py-4 text-gray-600">{sub.total}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{sub.percentage}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      <CheckCircle className="w-3 h-3" />
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
