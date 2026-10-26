// src/components/layout/AdminSidebar.tsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  return (
    <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col h-full">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-200">
        <Link to="/" className="text-lg font-bold tracking-tight text-zinc-900">
          {BRAND_CONFIG.name}
        </Link>
      </div>

      {/* Nav list */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <NavLink
          to="/admin"
          end
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-zinc-100 text-zinc-900 font-semibold'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            }`
          }
        >
          <Package className="w-4 h-4 text-[#D46A7E]" />
          <span>Products</span>
        </NavLink>
      </nav>

      {/* Footer Return Link */}
      <div className="p-4 border-t border-zinc-200">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors p-2 rounded-md hover:bg-zinc-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View Public Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
