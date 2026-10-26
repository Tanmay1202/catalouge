// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram } from 'lucide-react';
import { BRAND_CONFIG, getProductWhatsAppLink } from '../../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7ECE4]/70 border-t border-[#EBDCD2] mt-16 py-10 text-sm text-[#7D6B63]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            {BRAND_CONFIG.logoUrl && (
              <img
                src={BRAND_CONFIG.logoUrl}
                alt={BRAND_CONFIG.name}
                className="h-10 w-10 rounded-md object-contain border border-[#EBDCD2] bg-white shadow-2xs"
              />
            )}
            <div className="space-y-0.5 text-left">
              <Link to="/" className="text-base font-bold text-[#2B1A15] hover:text-[#C47A53] transition-colors leading-none block">
                {BRAND_CONFIG.name}
              </Link>
              <p className="text-xs text-[#7D6B63]">
                {BRAND_CONFIG.tagline}
              </p>
            </div>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#2B1A15] hover:text-[#C47A53] bg-white border border-[#EBDCD2] transition-colors min-h-[44px]"
            >
              <Instagram className="w-4 h-4 text-[#C47A53]" />
              <span>Instagram ({BRAND_CONFIG.instagramHandle})</span>
            </a>

            <a
              href={getProductWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#128C7E] bg-[#25D366]/15 hover:bg-[#25D366]/25 transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Enquiries</span>
            </a>
          </div>

          {/* Copyright & Admin Link */}
          <div className="text-xs text-[#7D6B63]/80 space-y-1">
            <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
            <Link to="/admin/login" className="hover:text-[#2B1A15] underline">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
