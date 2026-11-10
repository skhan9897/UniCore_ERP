import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import TableSkeleton from '../../components/loading/TableSkeleton';
import ButtonLoader from '../../components/loading/ButtonLoader';
import { Building2, Plus, Search, CheckCircle } from 'lucide-react';

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    address: ''
  });

  const fetchUniversities = async () => {
    try {
      const res = await axiosClient.get('/universities');
      if (res.success) {
        setUniversities(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axiosClient.post('/universities', formData);
      if (res.success) {
        setShowModal(false);
        setFormData({ code: '', name: '', contactEmail: '', contactPhone: '', website: '', address: '' });
        fetchUniversities();
      }
    } catch (err) {
      alert(err.message || 'Error creating university');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">University Tenant Management</h1>
          <p className="text-sm text-gray-500 mt-1">Register and govern university tenants across the platform</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Register New University</span>
        </button>
      </div>

      {loading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter universities..."
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">University Name</th>
                  <th className="px-6 py-3">Contact Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {universities.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500 text-sm">No universities registered yet.</td>
                  </tr>
                ) : (
                  universities.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono font-bold text-xs text-blue-600">{u.code}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 text-gray-600">{u.contactEmail || '-'}</td>
                      <td className="px-6 py-4 text-gray-600">{u.contactPhone || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          <CheckCircle className="w-3 h-3" />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Manage</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-900">Register University Tenant</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600">University Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. APEX-UNIV"
                    className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600">University Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full University Name"
                    className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600">Contact Email</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="admin@university.edu"
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 border text-gray-600 hover:bg-gray-100 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow"
                >
                  {submitting ? <ButtonLoader text="Registering..." /> : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityManagement;
