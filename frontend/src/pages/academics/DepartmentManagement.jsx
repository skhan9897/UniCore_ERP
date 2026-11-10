import React from 'react';
import { BookOpen, Building2, Users, GraduationCap } from 'lucide-react';

const DEPARTMENTS = [
  { code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. Robert Vance', faculty: 28, students: 480 },
  { code: 'EEE', name: 'Electrical & Electronics Engineering', hod: 'Dr. Elena Rostova', faculty: 22, students: 390 },
  { code: 'ME', name: 'Mechanical Engineering', hod: 'Dr. James Wright', faculty: 18, students: 320 },
  { code: 'BA', name: 'Business Administration (MBA)', hod: 'Prof. Marcus Brody', faculty: 15, students: 280 },
  { code: 'BIO', name: 'Biotechnology & Life Sciences', hod: 'Dr. Alan Grant', faculty: 14, students: 210 },
  { code: 'CIVIL', name: 'Civil & Environmental Engineering', hod: 'Dr. Sarah Connor', faculty: 16, students: 260 },
];

const DepartmentManagement = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-blue-600" />
            Academic Departments (14 Total)
          </h1>
          <p className="text-sm text-gray-500 mt-1">Apex Global University • Department Heads & Student Allocations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.code} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{dept.code}</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">{dept.name}</h3>
            <p className="text-xs text-gray-500 mt-1 font-medium">Head of Dept: <span className="text-gray-800 font-semibold">{dept.hod}</span></p>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t text-xs">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{dept.faculty} Faculty</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>{dept.students} Students</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement;
