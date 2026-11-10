import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../hooks/useLoading';
import LoginPage from '../pages/auth/LoginPage';
import DashboardLayout from '../layouts/DashboardLayout';

// Dashboards
import SuperAdminDashboard from '../pages/super-admin/SuperAdminDashboard';
import UniversityAdminDashboard from '../pages/university-admin/UniversityAdminDashboard';

// Core Business Domain Pages
import StudentManagement from '../pages/students/StudentManagement';
import FacultyManagement from '../pages/faculty/FacultyManagement';
import FeeManagement from '../pages/finance/FeeManagement';
import AttendanceManagement from '../pages/attendance/AttendanceManagement';
import DepartmentManagement from '../pages/academics/DepartmentManagement';
import CourseManagement from '../pages/academics/CourseManagement';
import ExamManagement from '../pages/examinations/ExamManagement';
import PlacementManagement from '../pages/placements/PlacementManagement';
import HostelManagement from '../pages/hostels/HostelManagement';

// Super Admin Pages
import UniversityManagement from '../pages/super-admin/UniversityManagement';
import CampusManagement from '../pages/super-admin/CampusManagement';
import UserManagement from '../pages/super-admin/UserManagement';
import SystemSettings from '../pages/super-admin/SystemSettings';

import DashboardLoader from '../components/loading/DashboardLoader';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, hasRole } = useAuth();
  const { isInitializing } = useLoading();

  if (loading || isInitializing) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <DashboardLoader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const RouteChangeTracker = () => {
  const location = useLocation();
  const { startRouteLoading, stopRouteLoading } = useLoading();

  useEffect(() => {
    startRouteLoading();
    const timer = setTimeout(() => {
      stopRouteLoading();
    }, 150);
    return () => clearTimeout(timer);
  }, [location, startRouteLoading, stopRouteLoading]);

  return null;
};

const AppRoutes = () => {
  return (
    <>
      <RouteChangeTracker />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<UniversityAdminDashboard />} />

          {/* Business Domain Routes */}
          <Route path="students" element={<StudentManagement />} />
          <Route path="faculty" element={<FacultyManagement />} />
          <Route path="finance" element={<FeeManagement />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="departments" element={<DepartmentManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="examinations" element={<ExamManagement />} />
          <Route path="placements" element={<PlacementManagement />} />
          <Route path="hostels" element={<HostelManagement />} />

          {/* Super Admin Routes */}
          <Route path="super-admin" element={<SuperAdminDashboard />} />
          <Route path="super-admin/universities" element={<UniversityManagement />} />
          <Route path="super-admin/campuses" element={<CampusManagement />} />
          <Route path="super-admin/users" element={<UserManagement />} />
          <Route path="super-admin/settings" element={<SystemSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
