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
      {/* 1. Announcement Bar (single line, plain, fast) */}
      <div className="bg-[#D46A7E] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>Handcrafted artificial jewellery. Direct orders & enquiries on WhatsApp!</span>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Name / Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center hover:opacity-90 transition-opacity"
              >
                {BRAND_CONFIG.logoUrl && !logoFailed ? (
                  <img
                    src={BRAND_CONFIG.logoUrl}
                    alt={BRAND_CONFIG.name}
                    className="h-10 sm:h-12 w-auto object-contain"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 hover:text-[#D46A7E] transition-colors">
                    {BRAND_CONFIG.name}
                  </span>
                )}
              </Link>
            </div>

            {/* Centre: Plain Text Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-700">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path && !item.path.includes('#');
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`hover:text-[#D46A7E] transition-colors py-1 ${
                      isActive ? 'text-[#D46A7E] font-semibold' : ''
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
                className="p-2 text-zinc-700 hover:text-zinc-900 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md"
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
                className="md:hidden p-2 text-zinc-700 hover:text-zinc-900 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-zinc-200 bg-white px-4 py-3 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search necklaces, earrings, bangles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm rounded-md border border-zinc-300 pl-9 pr-3 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#D46A7E] focus:border-[#D46A7E]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#D46A7E] text-white text-xs font-medium rounded-md hover:bg-[#BC5568] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-zinc-500 hover:text-zinc-800"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Hamburger Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-zinc-800 hover:bg-zinc-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 px-3 mb-2">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {BRAND_CONFIG.categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-zinc-700 hover:text-[#D46A7E]"
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
