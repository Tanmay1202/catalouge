import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE, CATEGORIES, getWhatsAppLink, getWhatsAppNumber } from '../../config/constants';

export const Footer: React.FC = () => {
  const whatsappNumber = getWhatsAppNumber();

  return (
    <footer className="bg-ivory border-t border-brand-border mt-20">
      {/* Brand value propositions banner */}
      <div className="border-b border-brand-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-cream border border-brand-border flex items-center justify-center text-brand-brown">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-brand-dark">Modern Designs</h4>
                <p className="text-xs text-warm-gray mt-0.5">Contemporary silhouettes crafted with precision</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-cream border border-brand-border flex items-center justify-center text-brand-brown">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-brand-dark">Premium Finishes</h4>
                <p className="text-xs text-warm-gray mt-0.5">Durable polish & radiant artificial stone settings</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-cream border border-brand-border flex items-center justify-center text-brand-brown">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-brand-dark">Thoughtfully Curated</h4>
                <p className="text-xs text-warm-gray mt-0.5">Selected pieces for festive and daily elegance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-wider text-brand-dark">
              {BRAND_NAME}
            </span>
            <p className="text-sm text-warm-gray max-w-sm">
              {BRAND_TAGLINE} A bespoke catalogue of artificial jewellery created to add understated charm to your personal style.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Catalogue categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-brand-dark/80 hover:text-brand-brown transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Enquiries */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-3">
              Enquiries & Assistance
            </h4>
            <p className="text-xs text-warm-gray leading-relaxed mb-3">
              Interested in any item? Click the WhatsApp enquiry button on any product card or send us an item code directly.
            </p>
            {whatsappNumber && (
              <p className="text-xs font-medium text-brand-dark">
                WhatsApp: <span className="text-brand-brown font-mono">+{whatsappNumber}</span>
              </p>
            )}
            <div className="mt-4 pt-4 border-t border-brand-border/60">
              <Link
                to="/admin/login"
                className="text-xs text-warm-gray/70 hover:text-brand-dark transition-colors inline-flex items-center gap-1"
              >
                <span>Store Admin Login</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between text-xs text-warm-gray gap-4">
          <p>© {new Date().getFullYear()} {BRAND_NAME} Jewellery. All rights reserved.</p>
          <p className="tracking-wide">Catalogue showcase & bespoke enquiries</p>
        </div>
      </div>
    </footer>
  );
};
