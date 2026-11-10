import axios from 'axios';

let loadingCallbacks = {
  onRequestStart: () => {},
  onRequestEnd: () => {},
};

export const registerLoadingInterceptors = (onRequestStart, onRequestEnd) => {
  loadingCallbacks.onRequestStart = onRequestStart;
  loadingCallbacks.onRequestEnd = onRequestEnd;
};

const axiosClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('unicore_token');
    const tenantId = localStorage.getItem('unicore_tenant_id');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    if (!config.silent) {
      loadingCallbacks.onRequestStart(false);
    }
    return config;
  },
  (error) => {
    loadingCallbacks.onRequestEnd(false);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (!response.config.silent) {
      loadingCallbacks.onRequestEnd(false);
    }
    return response.data;
  },
  (error) => {
    if (error.config && !error.config.silent) {
      loadingCallbacks.onRequestEnd(false);
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('unicore_token');
      localStorage.removeItem('unicore_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
