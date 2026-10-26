// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG, getProductWhatsAppLink } from '../../config/brand';

interface HeaderProps {
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoFailed, setLogoFailed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: 'About', path: '/#about' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      {/* 1. Announcement Bar: Warm Copper Accent */}
      <div className="bg-[#C47A53] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>Handcrafted artificial jewellery. Direct orders & enquiries on WhatsApp!</span>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#EBDCD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-2">
            {/* Left: Brand Logo & Title */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center gap-3 group"
              >
                {BRAND_CONFIG.logoUrl && !logoFailed && (
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg overflow-hidden border border-[#EBDCD2] bg-[#FAF6F2] flex items-center justify-center p-0.5 shadow-2xs group-hover:border-[#C47A53] transition-colors">
                    <img
                      src={BRAND_CONFIG.logoUrl}
                      alt={BRAND_CONFIG.name}
                      className="h-full w-full object-contain"
                      onError={() => setLogoFailed(true)}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#2B1A15] group-hover:text-[#C47A53] transition-colors leading-none">
                    Ziba
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium tracking-widest uppercase text-[#C47A53] mt-0.5">
                    By Nidhi
                  </span>
                </div>
              </Link>
            </div>

            {/* Centre: Plain Text Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#2B1A15]">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path && !item.path.includes('#');
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`hover:text-[#C47A53] transition-colors py-1 ${
                      isActive ? 'text-[#C47A53] font-semibold border-b-2 border-[#C47A53]' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search Icon + WhatsApp Icon Link */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search jewellery"
                className="p-2 text-[#2B1A15] hover:text-[#C47A53] hover:bg-[#F7ECE4] rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* WhatsApp direct link */}
              <a
                href={getProductWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Ziba by Nidhi on WhatsApp"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-xs font-semibold transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open menu"
                className="md:hidden p-2 text-[#2B1A15] hover:text-[#C47A53] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-[#EBDCD2] bg-[#FAF6F2] px-4 py-3 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7D6B63] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search necklaces, earrings, bangles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm rounded-md border border-[#EBDCD2] bg-white pl-9 pr-3 py-2 text-[#2B1A15] placeholder:text-[#7D6B63]/60 focus:outline-none focus:ring-1 focus:ring-[#C47A53] focus:border-[#C47A53]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#C47A53] text-white text-xs font-medium rounded-md hover:bg-[#AC643F] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-[#7D6B63] hover:text-[#2B1A15]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Hamburger Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#EBDCD2] bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#2B1A15] hover:bg-[#F7ECE4]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EBDCD2]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7D6B63] px-3 mb-2">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {BRAND_CONFIG.categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-[#2B1A15] hover:text-[#C47A53]"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
