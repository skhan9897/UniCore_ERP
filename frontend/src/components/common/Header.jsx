import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GlobalSearchModal from '../modals/GlobalSearchModal';
import NotificationsModal from '../modals/NotificationsModal';
import { Bell, Search, LogOut, Shield } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4 w-96">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="relative w-full cursor-pointer group"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-blue-600 transition" />
          <input
            type="text"
            readOnly
            placeholder="Search students, faculty, courses, transactions..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-600 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-navy-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow">
            {user?.firstName?.charAt(0) || 'S'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user?.firstName || 'System'} {user?.lastName || 'SuperAdmin'}
            </p>
            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
              <Shield className="w-3 h-3" />
              <span>{user?.roles?.[0]?.replace('ROLE_', '') || 'SUPER_ADMIN'}</span>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign Out"
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications Popover */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />
      </div>

      {/* Global Search Overlay */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Header;
