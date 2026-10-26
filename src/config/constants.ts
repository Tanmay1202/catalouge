// src/config/constants.ts
// Bridges brand config and legacy constants cleanly
import { BRAND_CONFIG, Category, getProductWhatsAppLink, formatPrice } from './brand';

export const BRAND_NAME = BRAND_CONFIG.name;
export const BRAND_TAGLINE = BRAND_CONFIG.tagline;
export const BRAND_SUBTITLE = 'Handcrafted fashion and artificial jewellery for every occasion.';

export const CATEGORIES = BRAND_CONFIG.categories;
export type { Category };

/**
 * Category metadata with placeholder photography
 * TODO(client): Replace with brand's real jewellery photography
 */
export const CATEGORY_METADATA: Record<Category, { title: string; image: string; description: string }> = {
  Necklaces: {
    title: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    description: 'Chokers, pendant sets, and statement necklaces.',
  },
  Earrings: {
    title: 'Earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    description: 'Jhumkas, studs, drops, and hoops.',
  },
  Bracelets: {
    title: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=800&auto=format&fit=crop',
    description: 'Charm bracelets and delicate chain cuffs.',
  },
  Rings: {
    title: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'Statement bands and stackable rings.',
  },
  Bangles: {
    title: 'Bangles',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop',
    description: 'Kada bangles and stone-studded sets.',
  },
};

export const COLOR_OPTIONS = [
  { name: 'Gold Tone', hex: '#D4A853' },
  { name: 'Silver Tone', hex: '#C0C0C0' },
  { name: 'Rose Gold Tone', hex: '#E8B4A0' },
  { name: 'Oxidised', hex: '#636363' },
  { name: 'Antique Finish', hex: '#8B7355' },
];

export const COLOR_HEX_MAP: Record<string, string> = COLOR_OPTIONS.reduce(
  (acc, cur) => ({ ...acc, [cur.name]: cur.hex }),
  {}
);

export function getWhatsAppNumber(): string {
  return BRAND_CONFIG.whatsappNumber;
}

export function getWhatsAppLink(productName?: string, price?: number): string {
  return getProductWhatsAppLink(productName, price);
}

export { formatPrice };
