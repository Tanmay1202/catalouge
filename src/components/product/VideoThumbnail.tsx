// src/components/product/VideoThumbnail.tsx
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { getVideoType, getYouTubeThumbnailUrl } from '../../lib/videoUtils';

interface VideoThumbnailProps {
  url: string;
  /** Size variant – defaults to 'strip' (64×64) matching image thumbnail row */
  size?: 'strip' | 'card';
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ url, size = 'strip' }) => {
  const type = getVideoType(url);
  const ytThumb = type === 'youtube' ? getYouTubeThumbnailUrl(url) : null;
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const label = type === 'youtube' ? 'YouTube' : type === 'instagram' ? 'Reel' : 'Video';

  const sizeClasses =
    size === 'card'
      ? 'w-full aspect-video rounded-lg'
      : 'w-16 h-16 rounded-md flex-shrink-0';

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Watch on ${label}`}
      className={`relative overflow-hidden border-2 border-[#EBDCD2] hover:border-[#C47A53] transition-all focus:outline-none focus:ring-2 focus:ring-[#C47A53] group ${sizeClasses}`}
    >
      {/* Thumbnail background */}
      {type === 'youtube' && ytThumb && !imgError ? (
        <img
          src={ytThumb}
          alt={`Watch on YouTube`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Instagram / fallback: branded gradient placeholder */
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background:
              type === 'instagram'
                ? 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)'
                : 'linear-gradient(135deg, #C47A53 0%, #2B1A15 100%)',
          }}
        >
          {type === 'instagram' && (
            /* Instagram camera icon (SVG) */
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className={size === 'card' ? 'w-8 h-8' : 'w-5 h-5'}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          )}
        </div>
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

      {/* Play button circle overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`rounded-full bg-black/50 group-hover:bg-black/70 flex items-center justify-center transition-colors ${
            size === 'card' ? 'w-12 h-12' : 'w-7 h-7'
          }`}
        >
          <Play
            className={`text-white fill-white ml-0.5 ${size === 'card' ? 'w-5 h-5' : 'w-3 h-3'}`}
          />
        </div>
      </div>

      {/* Platform label badge */}
      <span
        className={`absolute bottom-0 left-0 right-0 text-center text-white font-semibold bg-black/40 leading-none ${
          size === 'card' ? 'text-[10px] py-1' : 'text-[8px] py-0.5'
        }`}
      >
        {label}
      </span>
    </button>
  );
};
