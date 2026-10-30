// src/lib/colors.ts
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ziba_custom_colors';

export interface ColorOption {
  name: string;
  hex?: string;
}

export const DEFAULT_COLORS: ColorOption[] = [
  { name: 'Gold Tone', hex: '#D4A853' },
  { name: 'Silver Tone', hex: '#C0C0C0' },
  { name: 'Rose Gold Tone', hex: '#E8B4A0' },
  { name: 'Oxidised', hex: '#636363' },
  { name: 'Antique Finish', hex: '#8B7355' },
  { name: 'Ruby Red', hex: '#9B111E' },
  { name: 'Emerald Green', hex: '#046307' },
  { name: 'Mint Green', hex: '#98FF98' },
  { name: 'Pearl White', hex: '#FDFBF7' },
  { name: 'Royal Blue', hex: '#4169E1' },
];

/**
 * Retrieve custom colors stored locally
 */
export function getStoredColors(): ColorOption[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Add and persist a custom color option
 */
export function addCustomColor(name: string, hex?: string): ColorOption[] {
  const trimmed = name.trim();
  if (!trimmed) return getAllColors();

  const current = getStoredColors();
  const all = [...DEFAULT_COLORS, ...current];
  const exists = all.some((c) => c.name.toLowerCase() === trimmed.toLowerCase());

  if (!exists) {
    const formatted = trimmed
      .split(' ')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
      .join(' ');

    const newColor: ColorOption = { name: formatted, hex: hex || '#C47A53' };
    const updated = [...current, newColor];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ziba_colors_updated'));
      }
    } catch (err) {
      console.warn('Failed to save custom color:', err);
    }
  }

  return getAllColors();
}

/**
 * Get all available color options (defaults + custom)
 */
export function getAllColors(): ColorOption[] {
  const custom = getStoredColors();
  const map = new Map<string, ColorOption>();

  DEFAULT_COLORS.forEach((c) => map.set(c.name.toLowerCase(), c));
  custom.forEach((c) => map.set(c.name.toLowerCase(), c));

  return Array.from(map.values());
}

/**
 * React hook to reactively list available colors
 */
export function useColors() {
  const [colors, setColors] = useState<ColorOption[]>(() => getAllColors());

  useEffect(() => {
    const handleUpdate = () => {
      setColors(getAllColors());
    };

    window.addEventListener('ziba_colors_updated', handleUpdate);
    return () => {
      window.removeEventListener('ziba_colors_updated', handleUpdate);
    };
  }, []);

  const handleAddColor = (name: string, hex?: string) => {
    const updated = addCustomColor(name, hex);
    setColors(updated);
    return updated;
  };

  return { colors, addColor: handleAddColor };
}
