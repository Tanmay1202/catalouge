// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, X, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG, getProductWhatsAppLink } from '../../config/brand';

export const Header: React.FC = () => {
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
    }
  };

  // Build category navigation list: "All" followed by each category
  const categoryNavItems = [
    { label: 'All', path: '/products', category: '' },
    ...BRAND_CONFIG.categories.map((cat) => ({
      label: cat,
      path: `/products?category=${encodeURIComponent(cat)}`,
      category: cat,
    })),
  ];

  // Helper to determine if a category link is active
  const isCategoryActive = (categoryValue: string) => {
    if (location.pathname !== '/products') return false;
    const currentCategory = new URLSearchParams(location.search).get('category') || '';
    return currentCategory.toLowerCase() === categoryValue.toLowerCase();
  };

  return (
    <>
      {/* 1. Announcement Bar: Warm Copper Accent */}
      <div className="bg-[#C47A53] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>Handcrafted artificial jewellery. Direct orders & enquiries on WhatsApp!</span>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#EBDCD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 py-2 gap-4">
            {/* Left: Brand Logo & Title */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2.5 sm:gap-3 group"
                aria-label={`${BRAND_CONFIG.name} Home`}
              >
                {BRAND_CONFIG.logoUrl && !logoFailed && (
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden border border-[#EBDCD2] bg-[#FAF6F2] flex items-center justify-center p-0.5 shadow-2xs group-hover:border-[#C47A53] transition-colors">
                    <img
                      src={BRAND_CONFIG.logoUrl}
                      alt={BRAND_CONFIG.name}
                      className="h-full w-full object-contain"
                      onError={() => setLogoFailed(true)}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#2B1A15] group-hover:text-[#C47A53] transition-colors leading-none">
                    Ziba
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-[#C47A53] mt-0.5">
                    By Nidhi
                  </span>
                </div>
              </Link>
            </div>

            {/* Centre: Category Navigation Bar (Desktop) */}
            <nav className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 text-sm">
              {categoryNavItems.map((item) => {
                const active = isCategoryActive(item.category);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                      active
                        ? 'bg-[#C47A53] text-white shadow-2xs font-semibold'
                        : 'text-[#2B1A15] hover:text-[#C47A53] hover:bg-[#F7ECE4]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search Icon + WhatsApp Action */}
            <div className="flex items-center space-x-2">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search catalogue"
                className="p-2 text-[#2B1A15] hover:text-[#C47A53] hover:bg-[#F7ECE4] rounded-md transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* WhatsApp direct link */}
              <a
                href={getProductWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Ziba by Nidhi on WhatsApp"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-xs font-semibold transition-colors min-h-[40px]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Category Strip: Horizontally scrollable 1-tap browsing */}
        <div className="md:hidden border-t border-[#EBDCD2]/70 bg-[#FAF6F2] py-2 px-3 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {categoryNavItems.map((item) => {
            const active = isCategoryActive(item.category);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[30px] flex items-center ${
                  active
                    ? 'bg-[#C47A53] text-white shadow-2xs font-semibold'
                    : 'bg-white text-[#2B1A15] border border-[#EBDCD2] hover:border-[#C47A53]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
      </header>
    </>
  );
};
