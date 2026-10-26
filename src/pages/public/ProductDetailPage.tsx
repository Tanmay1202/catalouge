// src/pages/public/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchProductByIdOrCode } from '../../lib/products';
import { Spinner } from '../../components/ui/Spinner';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { formatPrice, getProductWhatsAppLink, BRAND_CONFIG } from '../../config/brand';

export const ProductDetailPage: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function load() {
      if (!productCode) {
        setIsLoading(false);
        return;
      }

      try {
        const found = await fetchProductByIdOrCode(productCode);
        if (isMounted) {
          setProduct(found);
          setSelectedImageIndex(0);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [productCode]);

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Spinner size="md" label="Loading piece details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900">
          Piece Not Found
        </h1>
        <p className="text-sm text-zinc-500">
          The requested jewellery piece may have been removed or updated.
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop'];

  const productUrl = typeof window !== 'undefined' ? window.location.href : undefined;

  const handleWhatsAppEnquiry = () => {
    const link = getProductWhatsAppLink(product.name, product.price, productUrl);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back to Shop Link */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Showcase */}
        <div className="space-y-3">
          {/* Main Large Image (4:5 aspect ratio) */}
          <div className="aspect-[4/5] w-full rounded-lg bg-zinc-100 border border-zinc-200 overflow-hidden">
            <img
              src={images[selectedImageIndex] || images[0]}
              alt={`Handcrafted artificial jewellery — ${product.name}`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop';
              }}
            />
          </div>

          {/* Thumbnail row if multiple images exist */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx ? 'border-[#D46A7E]' : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & WhatsApp Action */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#D46A7E]">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="text-2xl font-bold text-zinc-900">
                {formatPrice(product.price)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-sm text-zinc-400 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-zinc-200 pt-4 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Description
            </h2>
            <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
              {product.description || 'Handcrafted artificial jewellery designed for everyday sparkle and festive occasions.'}
            </p>
          </div>

          {/* WhatsApp Primary Order CTA */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleWhatsAppEnquiry}
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors shadow-sm min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Enquire on WhatsApp</span>
            </button>
            <p className="text-xs text-center text-zinc-500">
              Orders and enquiries are handled directly on WhatsApp.
            </p>
          </div>

          {/* Simple Instagram link */}
          <div className="pt-4 border-t border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
            <span>Brand: {BRAND_CONFIG.name}</span>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D46A7E] hover:underline font-medium"
            >
              Follow {BRAND_CONFIG.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
