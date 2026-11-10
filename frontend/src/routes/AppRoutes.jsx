import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../hooks/useLoading';
import LoginPage from '../pages/auth/LoginPage';
import DashboardLayout from '../layouts/DashboardLayout';
import SuperAdminDashboard from '../pages/super-admin/SuperAdminDashboard';
import UniversityAdminDashboard from '../pages/university-admin/UniversityAdminDashboard';
import UniversityManagement from '../pages/super-admin/UniversityManagement';
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
    }, 200);
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

          {/* Super Admin Routes */}
          <Route
            path="super-admin"
            element={
              <ProtectedRoute allowedRoles={['ROLE_SUPER_ADMIN']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="super-admin/universities"
            element={
              <ProtectedRoute allowedRoles={['ROLE_SUPER_ADMIN']}>
                <UniversityManagement />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
