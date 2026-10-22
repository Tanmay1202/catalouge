import React from 'react';
import { COLOR_OPTIONS } from '../../config/constants';
import { Check } from 'lucide-react';

export interface ColorSelectorProps {
  selectedColors: string[];
  onChange: (colors: string[]) => void;
  error?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColors,
  onChange,
  error,
}) => {
  const toggleColor = (name: string) => {
    if (selectedColors.includes(name)) {
      onChange(selectedColors.filter((c) => c !== name));
    } else {
      onChange([...selectedColors, name]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray mb-2">
        Available Colors / Finishes
      </label>

      <div className="flex flex-wrap gap-3">
        {COLOR_OPTIONS.map((c) => {
          const isSelected = selectedColors.includes(c.name);

          return (
            <button
              type="button"
              key={c.name}
              onClick={() => toggleColor(c.name)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                isSelected
                  ? 'border-brand-brown bg-ivory text-brand-dark shadow-xs ring-1 ring-brand-brown/40'
                  : 'border-brand-border bg-white text-warm-gray hover:border-brand-border/80 hover:text-brand-dark'
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-black/10 flex items-center justify-center relative shadow-xs"
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${
                      c.name === 'White' || c.name === 'Silver'
                        ? 'text-brand-dark'
                        : 'text-white'
                    }`}
                  />
                )}
              </div>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-warm-gray">
          Select all colour finishes currently offered for this product.
        </p>
      )}
    </div>
  );
};
