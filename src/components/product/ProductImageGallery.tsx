import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const fallback =
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop';
  
  const safeImages = images && images.length > 0 ? images : [fallback];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Primary Hero Image */}
      <div className="relative aspect-[4/4.5] w-full rounded-xl bg-ivory/60 border border-brand-border overflow-hidden group">
        <img
          src={safeImages[selectedIndex] || fallback}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallback;
          }}
        />

        {/* Arrow navigation if multiple images */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-brand-dark shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-brand-dark shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter indicator */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-brand-dark/70 text-white text-[11px] font-mono tracking-wider">
            {selectedIndex + 1} / {safeImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails row */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-brand-brown ring-1 ring-brand-brown scale-102'
                  : 'border-brand-border/80 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallback;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
