import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import { useLoading } from '../hooks/useLoading';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('unicore_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const { setInitializingComplete, setAppConnectionError } = useLoading();

  const verifyAuthentication = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('unicore_token');

    if (!token) {
      // Ensure minimum 1.5 second display for splash branding
      setTimeout(() => {
        setLoading(false);
        setInitializingComplete();
      }, 1500);
      return;
    }

    try {
      const res = await axiosClient.get('/auth/me', { silent: true });
      if (res.success) {
        setUser(res.data);
        localStorage.setItem('unicore_user', JSON.stringify(res.data));
        if (res.data.tenantId) {
          localStorage.setItem('unicore_tenant_id', res.data.tenantId);
        }
      }
      setTimeout(() => {
        setLoading(false);
        setInitializingComplete();
      }, 1500);
    } catch (err) {
      console.error("Auth verification error", err);
      if (err.message && (err.message.includes('Network Error') || !err.response)) {
        setAppConnectionError({
          message: "Could not reach UniCore ERP backend service. Please verify server connection."
        });
      } else {
        logout();
        setTimeout(() => {
          setLoading(false);
          setInitializingComplete();
        }, 1500);
      }
    }
  }, [setInitializingComplete, setAppConnectionError]);

  useEffect(() => {
    verifyAuthentication();
  }, [verifyAuthentication]);

  const login = async (username, password) => {
    const res = await axiosClient.post('/auth/login', { username, password });
    if (res.success && res.data) {
      const { token, user: userData } = res.data;
      localStorage.setItem('unicore_token', token);
      localStorage.setItem('unicore_user', JSON.stringify(userData));
      if (userData.tenantId) {
        localStorage.setItem('unicore_tenant_id', userData.tenantId);
      }
      setUser(userData);
      return userData;
    } else {
      throw new Error(res.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('unicore_token');
    localStorage.removeItem('unicore_user');
    localStorage.removeItem('unicore_tenant_id');
    setUser(null);
  };

  const hasRole = (roles) => {
    if (!user || !user.roles) return false;
    if (Array.isArray(roles)) {
      return roles.some(role => user.roles.includes(role));
    }
    return user.roles.includes(roles);
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, hasPermission, loading, verifyAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
