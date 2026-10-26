// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram } from 'lucide-react';
import { BRAND_CONFIG, getProductWhatsAppLink } from '../../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-16 py-8 text-sm text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Tagline */}
          <div className="space-y-1">
            <Link to="/" className="text-lg font-bold text-zinc-900 hover:text-[#D46A7E] transition-colors">
              {BRAND_CONFIG.name}
            </Link>
            <p className="text-xs text-zinc-500">
              {BRAND_CONFIG.tagline}
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex items-center gap-4">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-700 hover:text-pink-600 hover:bg-zinc-50 border border-zinc-200 transition-colors min-h-[44px]"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram ({BRAND_CONFIG.instagramHandle})</span>
            </a>

            <a
              href={getProductWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#128C7E] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Enquiries</span>
            </a>
          </div>

          {/* Copyright & Admin Link */}
          <div className="text-xs text-zinc-400 space-y-1">
            <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
            <Link to="/admin/login" className="hover:text-zinc-600 underline">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
