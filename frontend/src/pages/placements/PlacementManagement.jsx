import React from 'react';
import { Briefcase, Building2, CheckCircle, Award, TrendingUp } from 'lucide-react';

const COMPANIES = [
  { name: 'Google Cloud', role: 'Software Development Engineer', package: '$145,000 / yr', offers: 18, driveDate: '2026-10-15', status: 'COMPLETED' },
  { name: 'Microsoft Enterprise', role: 'Cloud Solutions Architect', package: '$138,000 / yr', offers: 24, driveDate: '2026-10-22', status: 'COMPLETED' },
  { name: 'Amazon AWS', role: 'DevOps & Systems Engineer', package: '$132,000 / yr', offers: 30, driveDate: '2026-11-02', status: 'COMPLETED' },
  { name: 'Goldman Sachs', role: 'Financial Technology Associate', package: '$128,000 / yr', offers: 12, driveDate: '2026-11-18', status: 'UPCOMING' },
];

const PlacementManagement = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-blue-600" />
            Corporate Placement & Careers
          </h1>
          <p className="text-sm text-gray-500 mt-1">Placement Rate: 88.5% • Highest Package: $145,000 / yr</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Batch Placement Rate</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">88.5%</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">↑ 5.2% vs last year</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Recruiting Partners</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">64 Corporate Drives</h3>
          <p className="text-xs text-gray-500 mt-1">84 Offers issued to date</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Average Package</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">$135,700 / yr</h3>
          <p className="text-xs text-gray-500 mt-1">Tier-1 Multinational Offers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Job Role</th>
                <th className="px-6 py-3">Salary Package</th>
                <th className="px-6 py-3">Offers Made</th>
                <th className="px-6 py-3">Drive Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COMPANIES.map((comp) => (
                <tr key={comp.name} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-bold text-gray-900">{comp.name}</td>
                  <td className="px-6 py-4 text-gray-600">{comp.role}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{comp.package}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{comp.offers} Offers</td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-xs">{comp.driveDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      comp.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {comp.status}
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

export default PlacementManagement;
