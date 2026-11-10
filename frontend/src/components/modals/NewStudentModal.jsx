import React, { useState } from 'react';
import ButtonLoader from '../loading/ButtonLoader';
import { UserPlus, X, CheckCircle } from 'lucide-react';

const NewStudentModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    academicSession: '2026-2027',
    enrollmentNo: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Student registered successfully! Generated Enrollment No: ${formData.enrollmentNo}`);
      setTimeout(() => {
        setSuccessMsg('');
        if (onSuccess) onSuccess(formData);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">New Student Registration</h3>
              <p className="text-xs text-gray-500">Auto-assigns unique enrollment and roll numbers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Morgan"
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@student.edu"
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option>Computer Science & Engineering</option>
                  <option>Electrical & Electronics Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Business Administration (MBA)</option>
                  <option>Biotechnology & Life Sciences</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Enrollment No (Auto-generated)</label>
                <input
                  type="text"
                  disabled
                  value={formData.enrollmentNo}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 bg-gray-100 font-mono text-blue-600 font-semibold"
                />
              </div>
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
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow"
              >
                {loading ? <ButtonLoader text="Registering..." /> : 'Confirm Admission'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewStudentModal;
