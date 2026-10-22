import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Package, Grid, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { BRAND_NAME } from '../../config/constants';

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  return (
    <aside className="w-64 bg-cream/95 border-r border-brand-border flex flex-col h-full">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-brand-border">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-wider text-brand-dark">
          {BRAND_NAME}
        </Link>
      </div>

      {/* Nav list */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <NavLink
          to="/admin"
          end
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-ivory text-brand-brown font-semibold shadow-xs border border-brand-border/60'
                : 'text-brand-dark/70 hover:bg-ivory/50 hover:text-brand-dark'
            }`
          }
        >
          <Package className="w-4 h-4 text-brand-brown" />
          <span>Products</span>
        </NavLink>

        {/* Categories (Informational / Future expansion) */}
        <div
          title="Dynamic category management is reserved for next release"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-warm-gray/60 cursor-not-allowed select-none"
        >
          <div className="flex items-center gap-3">
            <Grid className="w-4 h-4" />
            <span>Categories</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-ivory text-warm-gray">
            Fixed
          </span>
        </div>

        {/* Media (Managed through product images) */}
        <div
          title="Media files are managed directly through product forms"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-warm-gray/60 cursor-not-allowed select-none"
        >
          <div className="flex items-center gap-3">
            <ImageIcon className="w-4 h-4" />
            <span>Media</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-ivory text-warm-gray">
            Auto
          </span>
        </div>
      </nav>

      {/* Footer Return Link */}
      <div className="p-4 border-t border-brand-border">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-warm-gray hover:text-brand-brown transition-colors p-2 rounded-md hover:bg-ivory"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View Public Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
