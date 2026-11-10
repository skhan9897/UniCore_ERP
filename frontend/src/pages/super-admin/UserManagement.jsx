import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import TableSkeleton from '../../components/loading/TableSkeleton';
import { Users, Shield, Plus, CheckCircle, Search } from 'lucide-react';

const SAMPLE_USERS = [
  { id: 'usr-super-admin', username: 'superadmin', name: 'System SuperAdmin', email: 'superadmin@unicoreerp.com', role: 'ROLE_SUPER_ADMIN', status: 'ACTIVE' },
  { id: 'usr-univ-admin', username: 'univadmin', name: 'Apex Admin', email: 'admin@apexuniversity.edu', role: 'ROLE_UNIVERSITY_ADMIN', status: 'ACTIVE' },
  { id: 'usr-registrar', username: 'registrar', name: 'Dr. John Registrar', email: 'registrar@apexuniversity.edu', role: 'ROLE_REGISTRAR', status: 'ACTIVE' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-purple-600" />
            System User Governance & RBAC
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform users and assign granular access permissions</p>
        </div>
        <button
          onClick={() => alert("Create System User Form")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create User Account</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search username, name, role..."
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Assigned Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-purple-700">{u.username}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{u.name}</td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      <Shield className="w-3 h-3 text-blue-600" />
                      {u.role.replace('ROLE_', '')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      <CheckCircle className="w-3 h-3" />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => alert(`Editing permissions for ${u.username}`)} className="text-xs text-purple-600 hover:text-purple-800 font-semibold">
                      Edit Roles
                    </button>
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

export default UserManagement;
