import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import StatCard from '../../components/common/StatCard';
import DashboardLoader from '../../components/loading/DashboardLoader';
import { useLoading } from '../../hooks/useLoading';
import { Users, GraduationCap, CreditCard, CheckSquare, Download } from 'lucide-react';

const UniversityAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { startExportLoader, stopExportLoader } = useLoading();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get('/dashboard/university-admin');
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Error fetching university admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleExportReport = () => {
    startExportLoader("Generating University Performance PDF Report...");
    setTimeout(() => {
      stopExportLoader();
    }, 2000);
  };

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">University Management Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Apex Global University • Academic Session 2026-2027</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none">
            <option>All Campuses</option>
            <option>Main Campus</option>
          </select>
          <button
            onClick={handleExportReport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={GraduationCap}
          color="blue"
        />
        <StatCard
          title="Total Faculty"
          value={stats?.totalFaculty || 0}
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Total Fee Collection"
          value={stats?.totalFeeCollection || '$0'}
          icon={CreditCard}
          color="purple"
        />
        <StatCard
          title="Attendance Rate"
          value={stats?.attendancePercentage || '0%'}
          icon={CheckSquare}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Academic & Operational Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Departments</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats?.totalDepartments || 0}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Active Courses</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats?.totalCourses || 0}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Pending Fee Dues</p>
              <p className="text-xl font-bold text-rose-600 mt-1">{stats?.pendingFeeCollection || '$0'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Pass Percentage</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">{stats?.passPercentage || '0%'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Placement Rate</p>
              <p className="text-xl font-bold text-blue-600 mt-1">{stats?.placementPercentage || '0%'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Hostel Occupancy</p>
              <p className="text-xl font-bold text-purple-600 mt-1">{stats?.hostelOccupancy || '0%'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Quick Management Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-200 rounded-lg text-xs font-semibold text-left transition flex items-center justify-between">
                <span>+ New Student Admission</span>
                <span>→</span>
              </button>
              <button className="w-full py-2.5 px-4 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-200 rounded-lg text-xs font-semibold text-left transition flex items-center justify-between">
                <span>Collect Fee / Issue Receipt</span>
                <span>→</span>
              </button>
              <button className="w-full py-2.5 px-4 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-200 rounded-lg text-xs font-semibold text-left transition flex items-center justify-between">
                <span>Publish Exam Schedule</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityAdminDashboard;
