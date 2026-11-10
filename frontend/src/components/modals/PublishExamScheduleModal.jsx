import React, { useState } from 'react';
import ButtonLoader from '../loading/ButtonLoader';
import { Calendar, X, CheckCircle, Send } from 'lucide-react';

const PublishExamScheduleModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [formData, setFormData] = useState({
    examName: 'Mid-Term Examinations Fall 2026',
    department: 'All Departments',
    startDate: '2026-11-20',
    endDate: '2026-11-30',
    notificationChannel: 'Email + SMS + Student Portal',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPublished(true);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Publish Examination Schedule</h3>
              <p className="text-xs text-gray-500">Auto-notifies students & generates admit cards</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {published ? (
          <div className="space-y-4 border p-4 rounded-xl bg-amber-50 text-center animate-fadeIn">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full mx-auto flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Schedule Published Successfully!</h4>
              <p className="text-xs text-gray-600 mt-1">
                Notifications dispatched to 2,450 students across all departments. Admit cards are now downloadable on Student Portal.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600">Examination Title</label>
              <input
                type="text"
                required
                value={formData.examName}
                onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">End Date</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">Target Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500"
              >
                <option>All Departments</option>
                <option>Computer Science & Engineering</option>
                <option>Electrical Engineering</option>
                <option>Business Administration</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border text-gray-600 hover:bg-gray-100 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow"
              >
                {loading ? <ButtonLoader text="Publishing..." /> : 'Publish Schedule'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PublishExamScheduleModal;
