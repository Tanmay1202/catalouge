import { Category, ColorOption } from '../types/product';
export type { Category };

export const BRAND_NAME = 'AURELLE';
export const BRAND_TAGLINE = 'Everyday pieces. Remarkable details.';
export const BRAND_SUBTITLE = 'A considered collection of jewellery for every occasion.';

export const CATEGORIES: readonly Category[] = [
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Rings',
  'Bangles',
] as const;

export const CATEGORY_METADATA: Record<Category, { title: string; image: string; description: string }> = {
  Necklaces: {
    title: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    description: 'Chokers, pendant chains and statement neckpieces.',
  },
  Earrings: {
    title: 'Earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    description: 'Drops, studs and chandeliers with crystal brilliance.',
  },
  Bracelets: {
    title: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591475819-79b8b730ab8c?q=80&w=800&auto=format&fit=crop',
    description: 'Chain bracelets, tennis bracelets and charm cuffs.',
  },
  Rings: {
    title: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'Solitaires, cocktail bands and stackable rings.',
  },
  Bangles: {
    title: 'Bangles',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop',
    description: 'Classic stone bangles, kada sets and contemporary cuffs.',
  },
};

export const COLOR_OPTIONS: ColorOption[] = [
  { name: 'Gold', hex: '#D4A853' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Rose Gold', hex: '#E8B4A0' },
  { name: 'Antique', hex: '#8B7355' },
  { name: 'Black', hex: '#2C2C2C' },
  { name: 'White', hex: '#F5F5F0' },
];

export const COLOR_HEX_MAP: Record<string, string> = COLOR_OPTIONS.reduce(
  (acc, cur) => ({ ...acc, [cur.name]: cur.hex }),
  {}
);

export function getWhatsAppNumber(): string {
  return import.meta.env.VITE_WHATSAPP_NUMBER || '';
}

export function getWhatsAppLink(productCode?: string, productName?: string): string {
  const number = getWhatsAppNumber();
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const baseUrl = cleanNumber ? `https://wa.me/${cleanNumber}` : 'https://wa.me/';

  if (productCode && productName) {
    const text = encodeURIComponent(
      `Hi ${BRAND_NAME}, I am interested in ${productName} (Item code: ${productCode}). Could you please share availability and details?`
    );
    return `${baseUrl}?text=${text}`;
  }

  const defaultText = encodeURIComponent(
    `Hi ${BRAND_NAME}, I would like to enquire about your jewellery catalogue.`
  );
  return `${baseUrl}?text=${defaultText}`;
}
