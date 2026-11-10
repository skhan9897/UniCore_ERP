import React from 'react';
import { BookOpen, Plus, Search, Award } from 'lucide-react';

const COURSES = [
  { code: 'CS-401', title: 'Advanced Distributed Systems', credits: '4 Credits', dept: 'Computer Science', semester: 'Semester 7', syllabus: 'Cloud Systems, Consensus, Paxos, Raft' },
  { code: 'CS-302', title: 'Database Management Systems', credits: '3 Credits', dept: 'Computer Science', semester: 'Semester 5', syllabus: 'Relational Model, SQL, Transactions, B-Trees' },
  { code: 'EE-201', title: 'Digital Signal Processing', credits: '4 Credits', dept: 'Electrical Engineering', semester: 'Semester 3', syllabus: 'Fourier Transform, Z-Transform, FIR/IIR' },
  { code: 'MB-104', title: 'Financial Analytics & Accounting', credits: '3 Credits', dept: 'Business Admin', semester: 'Semester 1', syllabus: 'Ledgers, Balance Sheets, NPV, IRR' },
];

const CourseManagement = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-teal-600" />
            Active Courses & Curriculum (48 Total)
          </h1>
          <p className="text-sm text-gray-500 mt-1">Degree Programs, Course Credits & Syllabus Regulations</p>
        </div>
        <button
          onClick={() => alert("New Course Creation Dialog")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Course</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Course Code</th>
                <th className="px-6 py-3">Course Title</th>
                <th className="px-6 py-3">Credits</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Semester</th>
                <th className="px-6 py-3">Syllabus Overview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COURSES.map((c) => (
                <tr key={c.code} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-teal-700">{c.code}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{c.title}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{c.credits}</td>
                  <td className="px-6 py-4 text-gray-600">{c.dept}</td>
                  <td className="px-6 py-4 text-gray-600">{c.semester}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{c.syllabus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
