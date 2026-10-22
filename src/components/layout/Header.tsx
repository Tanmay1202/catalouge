import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle } from 'lucide-react';
import { BRAND_NAME, CATEGORIES, getWhatsAppLink } from '../../config/constants';

interface HeaderProps {
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-brand-border/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-brand-dark hover:opacity-90 transition-opacity"
            >
              {BRAND_NAME}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {CATEGORIES.map((cat) => {
              const isActive =
                location.pathname === '/products' &&
                new URLSearchParams(location.search).get('category') === cat;

              return (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className={`text-sm font-medium transition-colors hover:text-brand-brown py-1 relative ${
                    isActive
                      ? 'text-brand-dark font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-brown'
                      : 'text-brand-dark/80'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="relative w-52 lg:w-64">
              <Search className="w-4 h-4 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full text-xs rounded-full border border-brand-border bg-ivory/60 pl-9 pr-3.5 py-2 text-brand-dark placeholder:text-warm-gray/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-brown focus:border-brand-brown transition-all"
              />
            </form>

            {/* WhatsApp direct icon */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 transition-colors"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>

            {/* Contact Button */}
            <button
              onClick={handleContactClick}
              className="px-5 py-2 text-xs font-medium tracking-wide uppercase rounded-md bg-brand-brown text-white hover:bg-brand-dark transition-colors shadow-xs"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu & Search Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 text-[#128C7E]"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-dark hover:text-brand-brown focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-cream px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-150">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or product ID..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full text-sm rounded-md border border-brand-border bg-white pl-9 pr-3.5 py-2.5 text-brand-dark placeholder:text-warm-gray/60"
            />
          </form>

          {/* Mobile category navigation */}
          <div className="space-y-1 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-warm-gray px-2 mb-1">
              Categories
            </p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium rounded-md text-brand-dark hover:bg-ivory"
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium rounded-md text-brand-brown hover:bg-ivory"
            >
              View All Catalogue →
            </Link>
          </div>

          <div className="pt-3 border-t border-brand-border flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleContactClick();
              }}
              className="w-full py-2.5 text-center text-xs font-medium tracking-wide uppercase rounded-md bg-brand-brown text-white"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
