import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, LayoutDashboard, BookOpen, Bookmark,
  FileText, Users, Settings, LogOut, Shield, BookMarked, ClipboardList
} from 'lucide-react';

const studentLinks = [
  { to: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/scholarships',    icon: BookOpen,         label: 'Scholarships' },
  { to: '/bookmarks',       icon: Bookmark,         label: 'Bookmarks' },
  { to: '/my-applications', icon: FileText,         label: 'My Applications' },
];

const adminLinks = [
  { to: '/admin',                  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/scholarships',     icon: BookMarked,      label: 'Scholarships' },
  { to: '/admin/applications',     icon: ClipboardList,   label: 'Applications' },
  { to: '/admin/users',            icon: Users,           label: 'Users' },
];

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const links = isAdmin ? adminLinks : studentLinks;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900/95 border-r border-white/5 flex flex-col z-40 backdrop-blur-sm">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg leading-none">Oratal</h1>
            <p className="text-xs text-slate-500 mt-0.5">Scholarship Portal</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              {isAdmin && <Shield size={10} className="text-primary-400" />}
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-4 mb-3">
          {isAdmin ? 'Management' : 'Navigation'}
        </p>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard' || to === '/admin'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button onClick={handleLogout} className="sidebar-link w-full text-red-400/80 hover:text-red-400 hover:bg-red-500/5">
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
