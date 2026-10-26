import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, LogOut, User, Sparkles } from 'lucide-react';
import { isSupabaseConfigured } from '../../config/supabase';

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[#FAF8F5]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="fixed inset-y-0 w-64">
          <AdminSidebar />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 bg-white shadow-xl flex flex-col">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md text-warm-gray hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-brand-border/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-brand-dark hover:bg-ivory rounded-md"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Offline / Dev banner if Supabase not configured */}
            {!isSupabaseConfigured && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Dev Mock Storage Mode (Configure .env.local for live Supabase)</span>
              </div>
            )}
          </div>

          {/* Right Admin Profile & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pr-2">
              <div className="w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center font-semibold text-sm">
                {admin?.email ? admin.email.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-brand-dark">Admin</p>
                <p className="text-[11px] text-warm-gray truncate max-w-[150px]">
                  {admin?.email || 'admin@ziba.com'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-warm-gray hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Admin Page Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
