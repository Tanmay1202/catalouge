// src/pages/public/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchProductByIdOrCode } from '../../lib/products';
import { Spinner } from '../../components/ui/Spinner';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { getProductWhatsAppLink, BRAND_CONFIG } from '../../config/brand';
import { VideoThumbnail } from '../../components/product/VideoThumbnail';

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
        <h1 className="text-2xl font-bold text-[#2B1A15]">
          Piece Not Found
        </h1>
        <p className="text-sm text-[#7D6B63]">
          The requested jewellery piece may have been removed or updated.
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#2B1A15] text-white text-xs font-medium hover:bg-[#3D261E] transition-colors"
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
    const link = getProductWhatsAppLink(product.name, undefined, productUrl);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back to Shop Link */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7D6B63] hover:text-[#2B1A15] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Showcase */}
        <div className="space-y-3">
          {/* Main Large Image (4:5 aspect ratio) */}
          <div className="aspect-[4/5] w-full rounded-lg bg-[#F7ECE4] border border-[#EBDCD2] overflow-hidden shadow-2xs">
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
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx ? 'border-[#C47A53] shadow-xs' : 'border-[#EBDCD2] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Video links: clickable play-button thumbnails */}
          {product.video_links && product.video_links.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7D6B63]">
                Watch Videos
              </p>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {product.video_links.map((url, idx) => (
                  <VideoThumbnail key={idx} url={url} size="strip" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Details & WhatsApp Action */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#C47A53]">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1A15]">
              {product.name}
            </h1>
          </div>

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="border-t border-[#EBDCD2] pt-4 space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7D6B63]">
                Available Colors / Finishes
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF6F2] text-[#2B1A15] border border-[#EBDCD2]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#C47A53]" />
                    <span>{color}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="border-t border-[#EBDCD2] pt-4 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7D6B63]">
              Description
            </h2>
            <p className="text-sm text-[#2B1A15]/90 leading-relaxed whitespace-pre-line">
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
            <p className="text-xs text-center text-[#7D6B63]">
              Orders and enquiries are handled directly on WhatsApp.
            </p>
          </div>

          {/* Simple Instagram link */}
          <div className="pt-4 border-t border-[#EBDCD2] text-xs text-[#7D6B63] flex items-center justify-between">
            <span>Brand: {BRAND_CONFIG.name}</span>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C47A53] hover:underline font-semibold"
            >
              Follow {BRAND_CONFIG.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
