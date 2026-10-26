// src/components/product/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Product } from '../../types/product';
import { formatPrice, getProductWhatsAppLink, BRAND_CONFIG } from '../../config/brand';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop';

  const productUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/products/${encodeURIComponent(product.id || product.product_code || '')}`
      : undefined;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!BRAND_CONFIG.whatsappNumber) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Ziba by Nidhi] WhatsApp number is not configured. TODO(client): Add VITE_WHATSAPP_NUMBER.'
        );
      }
    }

    const link = getProductWhatsAppLink(product.name, product.price, productUrl);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const productLink = `/products/${encodeURIComponent(product.id || product.product_code || '')}`;

  return (
    <div className="group flex flex-col bg-white rounded-lg border border-zinc-200 overflow-hidden hover:border-zinc-300 transition-colors">
      {/* Product Image: 4:5 aspect ratio with lazy loading and meaningful alt */}
      <Link
        to={productLink}
        className="relative block aspect-[4/5] bg-zinc-100 overflow-hidden"
      >
        <img
          src={primaryImage}
          alt={`Handcrafted artificial jewellery — ${product.name}`}
          loading={priority ? 'eager' : 'lazy'}
          width={400}
          height={500}
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop';
          }}
        />
      </Link>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Product Name (max 2 lines) */}
          <Link
            to={productLink}
            className="block text-sm font-medium text-zinc-900 hover:text-[#D46A7E] transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Price with Indian digit grouping and optional strikethrough original price */}
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-base font-semibold text-zinc-900">
              {formatPrice(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>

        {/* Primary Action Button: Enquire on WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          type="button"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium transition-colors min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
