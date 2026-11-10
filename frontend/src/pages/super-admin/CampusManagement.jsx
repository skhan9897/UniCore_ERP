import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import TableSkeleton from '../../components/loading/TableSkeleton';
import { MapPin, Plus, CheckCircle, Search } from 'lucide-react';

const CampusManagement = () => {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const res = await axiosClient.get('/campuses');
        if (res.success) {
          setCampuses(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampuses();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-amber-600" />
            Campus Location Governance
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage physical university campuses and facilities</p>
        </div>
        <button
          onClick={() => alert("Create Campus Form")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Campus Location</span>
        </button>
      </div>

      {loading ? (
        <TableSkeleton rows={3} columns={5} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3">Campus Code</th>
                  <th className="px-6 py-3">Campus Name</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campuses.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-amber-700">{c.code}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{c.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.address || '100 University Boulevard'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        c.isMain ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {c.isMain ? 'MAIN CAMPUS' : 'REGIONAL CAMPUS'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusManagement;
