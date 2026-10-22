import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Product } from '../../types/product';
import { ColorDots } from './ColorDots';
import { getWhatsAppLink } from '../../config/constants';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop';

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      getWhatsAppLink(product.product_code, product.name),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="group flex flex-col bg-white rounded-lg border border-brand-border/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Product Image Frame */}
      <Link
        to={`/products/${encodeURIComponent(product.product_code)}`}
        className="relative block aspect-[4/4.5] sm:aspect-[4/4.5] bg-ivory/50 overflow-hidden"
      >
        <img
          src={primaryImage}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Graceful fallback if image link fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* Category tag subtle badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-medium uppercase tracking-wider text-warm-gray shadow-xs">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Product Code */}
          <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-warm-gray mb-1">
            {product.product_code}
          </p>

          {/* Product Name */}
          <Link
            to={`/products/${encodeURIComponent(product.product_code)}`}
            className="block font-serif text-base sm:text-lg font-medium text-brand-dark hover:text-brand-brown transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Color Dots */}
          <div className="mt-2.5">
            <ColorDots colors={product.colors} size="md" />
          </div>
        </div>

        {/* Enquire on WhatsApp CTA button (matches mockup) */}
        <button
          onClick={handleWhatsAppClick}
          type="button"
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-brand-border bg-ivory/60 hover:bg-brand-brown hover:text-white hover:border-brand-brown text-brand-dark text-xs font-medium tracking-wide transition-all duration-200"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#128C7E] group-hover:text-white transition-colors" />
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
