import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ButtonLoader from '../../components/loading/ButtonLoader';
import { Building2, Lock, User, Shield, AlertCircle, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(username, password);
      if (user.roles?.includes('ROLE_SUPER_ADMIN')) {
        navigate('/super-admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials or login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
        <div className="bg-navy-900 p-8 text-white text-center relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black shadow-lg mb-4 border border-blue-400/30">
            U
          </div>
          <h1 className="text-2xl font-bold tracking-tight">UniCore ERP</h1>
          <p className="text-blue-300 text-xs font-medium uppercase tracking-widest mt-1">
            Enterprise University Platform
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Sign in to access your portal</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Username or Email</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              {loading ? (
                <ButtonLoader text="Authenticating..." />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium mb-2">Default Admin Credentials:</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-xs font-mono text-gray-700 border">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>superadmin / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
