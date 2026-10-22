import React from 'react';
import { COLOR_HEX_MAP } from '../../config/constants';

export interface ColorDotsProps {
  colors: string[];
  maxDisplay?: number;
  size?: 'sm' | 'md';
  className?: string;
  showLabels?: boolean;
}

export const ColorDots: React.FC<ColorDotsProps> = ({
  colors,
  maxDisplay = 4,
  size = 'md',
  className = '',
  showLabels = false,
}) => {
  if (!colors || colors.length === 0) return null;

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
  };

  const displayedColors = colors.slice(0, maxDisplay);
  const remainingCount = colors.length - maxDisplay;

  if (showLabels) {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {colors.map((color) => {
          const hex = COLOR_HEX_MAP[color] || '#D5C9B8';
          return (
            <div
              key={color}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ivory border border-brand-border text-xs text-brand-dark"
            >
              <span
                className="w-3 h-3 rounded-full border border-black/10 shadow-xs inline-block"
                style={{ backgroundColor: hex }}
                aria-hidden="true"
              />
              <span>{color}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label={`Available in: ${colors.join(', ')}`}>
      {displayedColors.map((color) => {
        const hex = COLOR_HEX_MAP[color] || '#D5C9B8';
        return (
          <span
            key={color}
            title={color}
            className={`${sizeClasses[size]} rounded-full border border-black/10 inline-block shadow-xs transition-transform hover:scale-125`}
            style={{ backgroundColor: hex }}
          />
        );
      })}
      {remainingCount > 0 && (
        <span className="text-[10px] font-medium text-warm-gray leading-none">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};
