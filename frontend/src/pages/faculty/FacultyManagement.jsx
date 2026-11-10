import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, Award, FileText } from 'lucide-react';

const SAMPLE_FACULTY = [
  { id: 'FAC-801', name: 'Dr. Robert Vance', designation: 'Professor & HOD', dept: 'Computer Science & Eng', qualification: 'Ph.D. MIT', publications: '34 Papers', status: 'ACTIVE' },
  { id: 'FAC-802', name: 'Dr. Elena Rostova', designation: 'Associate Professor', dept: 'Electrical Engineering', qualification: 'Ph.D. Stanford', publications: '21 Papers', status: 'ACTIVE' },
  { id: 'FAC-803', name: 'Prof. Marcus Brody', designation: 'Assistant Professor', dept: 'Business Administration', qualification: 'MBA Harvard', publications: '12 Papers', status: 'ACTIVE' },
  { id: 'FAC-804', name: 'Dr. Alan Grant', designation: 'Professor', dept: 'Biotechnology & Life Sciences', qualification: 'Ph.D. Oxford', publications: '45 Papers', status: 'ACTIVE' },
];

const FacultyManagement = () => {
  const [facultyList, setFacultyList] = useState(SAMPLE_FACULTY);
  const [search, setSearch] = useState('');

  const filtered = facultyList.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.dept.toLowerCase().includes(search.toLowerCase()) ||
    f.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-600" />
            Faculty & HR Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">185 Faculty Members • Qualifications, Publications & Workloads</p>
        </div>
        <button
          onClick={() => alert("Add Faculty Form Opened")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Faculty Member</span>
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
              placeholder="Search faculty name, department..."
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Employee ID</th>
                <th className="px-6 py-3">Faculty Name</th>
                <th className="px-6 py-3">Designation</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Qualification</th>
                <th className="px-6 py-3">Research Publications</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-emerald-700">{f.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{f.name}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{f.designation}</td>
                  <td className="px-6 py-4 text-gray-600">{f.dept}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">{f.qualification}</td>
                  <td className="px-6 py-4 font-bold text-purple-600">{f.publications}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => alert(`Viewing Workload & Payslip for ${f.name}`)} className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold flex items-center justify-end gap-1 ml-auto">
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Workload</span>
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

export default FacultyManagement;
