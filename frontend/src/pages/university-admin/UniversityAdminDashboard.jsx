import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import StatCard from '../../components/common/StatCard';
import DashboardLoader from '../../components/loading/DashboardLoader';
import NewStudentModal from '../../components/modals/NewStudentModal';
import CollectFeeModal from '../../components/modals/CollectFeeModal';
import PublishExamScheduleModal from '../../components/modals/PublishExamScheduleModal';
import { useLoading } from '../../hooks/useLoading';
import { Users, GraduationCap, CreditCard, CheckSquare, Download, ArrowRight, Building2, BookOpen, Calendar, Briefcase, Home } from 'lucide-react';

const UniversityAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  const { startExportLoader, stopExportLoader } = useLoading();
  const navigate = useNavigate();

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
    }, 1800);
  };

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Banner & Campus Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">University Management Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Apex Global University • Academic Session 2026-2027</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option>All Campuses</option>
            <option>Apex Main Campus</option>
            <option>North Science Campus</option>
          </select>
          <button
            onClick={handleExportReport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 4 Interactive Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div onClick={() => navigate('/students')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Total Students"
            value={stats?.totalStudents || 2450}
            icon={GraduationCap}
            color="blue"
          />
        </div>

        <div onClick={() => navigate('/faculty')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Total Faculty"
            value={stats?.totalFaculty || 185}
            icon={Users}
            color="emerald"
          />
        </div>

        <div onClick={() => navigate('/finance')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Total Fee Collection"
            value={stats?.totalFeeCollection || '$1,450,800.00'}
            icon={CreditCard}
            color="purple"
          />
        </div>

        <div onClick={() => navigate('/attendance')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Attendance Rate"
            value={stats?.attendancePercentage || '94.2%'}
            icon={CheckSquare}
            color="amber"
          />
        </div>
      </div>

      {/* Main Grid: Summary Cards & Quick Management Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Academic & Operational Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Departments */}
            <div
              onClick={() => navigate('/departments')}
              className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase group-hover:text-blue-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalDepartments || 14}</p>
              <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">Manage →</p>
            </div>

            {/* Active Courses */}
            <div
              onClick={() => navigate('/courses')}
              className="p-4 bg-gray-50 hover:bg-teal-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase group-hover:text-teal-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalCourses || 48}</p>
              <p className="text-[11px] text-teal-600 font-semibold mt-1 flex items-center gap-1">Syllabus →</p>
            </div>

            {/* Pending Fee Dues */}
            <div
              onClick={() => navigate('/finance')}
              className="p-4 bg-gray-50 hover:bg-rose-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase group-hover:text-rose-600">Pending Fee Dues</p>
              <p className="text-2xl font-bold text-rose-600 mt-1">{stats?.pendingFeeCollection || '$124,500.00'}</p>
              <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">Collect →</p>
            </div>

            {/* Pass Percentage */}
            <div
              onClick={() => navigate('/examinations')}
              className="p-4 bg-gray-50 hover:bg-emerald-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase group-hover:text-emerald-600">Pass Percentage</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats?.passPercentage || '96.8%'}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">Results →</p>
            </div>

            {/* Placement Rate */}
            <div
              onClick={() => navigate('/placements')}
              className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase group-hover:text-blue-600">Placement Rate</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats?.placementPercentage || '88.5%'}</p>
              <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">Drives →</p>
            </div>

            {/* Hostel Occupancy */}
            <div
              onClick={() => navigate('/hostels')}
              className="p-4 bg-gray-50 hover:bg-purple-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase group-hover:text-purple-600">Hostel Occupancy</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats?.hostelOccupancy || '82.0%'}</p>
              <p className="text-[11px] text-purple-600 font-semibold mt-1 flex items-center gap-1">Beds →</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Quick Management Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Quick Management Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsStudentModalOpen(true)}
                className="w-full py-3 px-4 bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-xl text-xs font-bold text-left transition flex items-center justify-between shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-extrabold text-sm">+</span>
                  <span>New Student Admission</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsFeeModalOpen(true)}
                className="w-full py-3 px-4 bg-gray-50 hover:bg-purple-50 text-gray-800 hover:text-purple-600 border border-gray-200 hover:border-purple-300 rounded-xl text-xs font-bold text-left transition flex items-center justify-between shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Collect Fee / Issue Receipt</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsExamModalOpen(true)}
                className="w-full py-3 px-4 bg-gray-50 hover:bg-amber-50 text-gray-800 hover:text-amber-600 border border-gray-200 hover:border-amber-300 rounded-xl text-xs font-bold text-left transition flex items-center justify-between shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Publish Exam Schedule</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modals */}
      <NewStudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
      />

      <CollectFeeModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
      />

      <PublishExamScheduleModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
      />
    </div>
  );
};

export default UniversityAdminDashboard;
