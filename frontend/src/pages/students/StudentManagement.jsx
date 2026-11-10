import React, { useState } from 'react';
import NewStudentModal from '../../components/modals/NewStudentModal';
import { GraduationCap, Plus, Search, Filter, CheckCircle, Download, FileText } from 'lucide-react';

const SAMPLE_STUDENTS = [
  { id: 'STU-2026-8492', name: 'Sarah Jenkins', dept: 'Computer Science', year: '3rd Year', gpa: '3.85', status: 'ACTIVE', feeStatus: 'PAID' },
  { id: 'STU-2026-7321', name: 'Michael Chang', dept: 'Electrical Engineering', year: '2nd Year', gpa: '3.92', status: 'ACTIVE', feeStatus: 'PAID' },
  { id: 'STU-2026-9104', name: 'Emily Davis', dept: 'Business Administration', year: '4th Year', gpa: '3.65', status: 'ACTIVE', feeStatus: 'PENDING' },
  { id: 'STU-2026-4482', name: 'David Miller', dept: 'Mechanical Engineering', year: '1st Year', gpa: '3.70', status: 'ACTIVE', feeStatus: 'PAID' },
  { id: 'STU-2026-5510', name: 'Jessica Taylor', dept: 'Biotechnology', year: '3rd Year', gpa: '3.88', status: 'ACTIVE', feeStatus: 'PAID' },
];

const StudentManagement = () => {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewStudent = (data) => {
    const newEntry = {
      id: data.enrollmentNo,
      name: `${data.firstName} ${data.lastName}`,
      dept: data.department,
      year: '1st Year',
      gpa: '4.00',
      status: 'ACTIVE',
      feeStatus: 'PAID'
    };
    setStudents([newEntry, ...students]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-blue-600" />
            Student Directory & Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">2,450 Enrolled Students • Multi-Campus Student Records</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Register New Student</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student name, ID, department..."
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <button className="px-3 py-1.5 border rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Enrollment ID</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Academic Year</th>
                <th className="px-6 py-3">CGPA</th>
                <th className="px-6 py-3">Fee Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-blue-600">{s.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{s.name}</td>
                  <td className="px-6 py-4 text-gray-600">{s.dept}</td>
                  <td className="px-6 py-4 text-gray-600">{s.year}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{s.gpa}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      s.feeStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {s.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => alert(`Viewing ID Card & Transcript for ${s.name}`)} className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-end gap-1 ml-auto">
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleNewStudent}
      />
    </div>
  );
};

export default StudentManagement;
