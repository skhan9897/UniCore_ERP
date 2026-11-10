import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CreditCard,
  BookMarked,
  Home,
  Bus,
  Briefcase,
  FileText,
  Settings,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

const Sidebar = () => {
  const { user, hasRole } = useAuth();

  const superAdminNav = [
    { title: 'Super Dashboard', path: '/super-admin', icon: LayoutDashboard },
    { title: 'Universities', path: '/super-admin/universities', icon: Building2 },
    { title: 'Campuses', path: '/super-admin/campuses', icon: MapPin },
    { title: 'User Management', path: '/super-admin/users', icon: Users },
    { title: 'System Settings', path: '/super-admin/settings', icon: Settings },
  ];

  const univAdminNav = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Admissions', path: '/admissions', icon: GraduationCap },
    { title: 'Students', path: '/students', icon: Users },
    { title: 'Faculty & HR', path: '/faculty', icon: Users },
    { title: 'Academics & Timetable', path: '/academics', icon: BookOpen },
    { title: 'Attendance', path: '/attendance', icon: CheckSquare },
    { title: 'Examinations', path: '/examinations', icon: Calendar },
    { title: 'Fees & Finance', path: '/finance', icon: CreditCard },
    { title: 'Library', path: '/library', icon: BookMarked },
    { title: 'Hostels', path: '/hostels', icon: Home },
    { title: 'Transport', path: '/transport', icon: Bus },
    { title: 'Placements', path: '/placements', icon: Briefcase },
    { title: 'Reports & Audit', path: '/reports', icon: FileText },
  ];

  const navItems = hasRole('ROLE_SUPER_ADMIN') ? superAdminNav : univAdminNav;

  return (
    <aside className="w-64 bg-navy-900 text-gray-200 flex flex-col min-h-screen shadow-xl">
      <div className="h-16 flex items-center px-6 border-b border-navy-800 bg-navy-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg">
            U
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-wide">UniCore ERP</h1>
            <p className="text-[10px] text-blue-400 font-medium tracking-wider uppercase">Enterprise Edition</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-navy-800 bg-navy-800/40">
        <p className="text-xs text-gray-400 uppercase font-semibold">Active Portal</p>
        <p className="text-sm font-medium text-white truncate mt-0.5">
          {hasRole('ROLE_SUPER_ADMIN') ? 'Super Admin Portal' : 'University Management'}
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md font-semibold'
                    : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-navy-800 bg-navy-950/60">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Tenant Isolated Mode</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
