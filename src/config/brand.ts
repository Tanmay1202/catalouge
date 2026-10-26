// src/config/brand.ts
// Central brand configuration for Ziba by Nidhi

export const BRAND_CONFIG = {
  /** Full official brand display name */
  name: 'Ziba by Nidhi',

  /** Shortened brand name for compact UI */
  shortName: 'Ziba',

  /**
   * Official brand logo file located in public/ folder
   */
  logoUrl: '/logo.jpeg',

  /**
   * Palette matching the watercolor peach & copper metallic logo vibe
   */
  colors: {
    copper: '#C47A53',
    copperHover: '#AC643F',
    copperLight: '#F7ECE4',
    espresso: '#2B1A15',
    taupe: '#7D6B63',
    page: '#FAF6F2',
    border: '#EBDCD2',
  },

  /**
   * Brand tagline
   * [CONFIRM] with client
   */
  tagline: 'Handcrafted artificial jewellery for everyday sparkle',

  /** Official Instagram profile */
  instagramUrl: 'https://www.instagram.com/ziba_by_nidhi_jewellery/',
  instagramHandle: '@ziba_by_nidhi_jewellery',

  /**
   * WhatsApp business contact number (format: country code + number, e.g. 919876543210 without + or spaces)
   * TODO(client): Provide official WhatsApp business number.
   * [CONFIRM]
   */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',

  /**
   * Business email address (optional)
   * TODO(client): Provide official email if desired
   * [CONFIRM]
   */
  email: '',

  /** Currency symbol and locale */
  currencySymbol: '₹',
  currencyLocale: 'en-IN',

  /** Category list */
  categories: ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Bangles'] as const,
};

export type Category = (typeof BRAND_CONFIG.categories)[number];

/**
 * Format a number into Indian currency representation (e.g. 1299 -> ₹1,299)
 */
export function formatPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) return '₹0';
  return `${BRAND_CONFIG.currencySymbol}${price.toLocaleString(BRAND_CONFIG.currencyLocale)}`;
}

/**
 * Generate a pre-filled WhatsApp enquiry link for a specific product
 */
export function getProductWhatsAppLink(
  productName?: string,
  price?: number,
  productUrl?: string
): string {
  const number = BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  if (!number) {
    if (import.meta.env.DEV) {
      console.warn(
        '[Ziba by Nidhi] WhatsApp number is not configured in VITE_WHATSAPP_NUMBER. TODO(client): Provide WhatsApp contact number.'
      );
    }
  }

  const base = number ? `https://wa.me/${number}` : 'https://wa.me/';

  if (productName) {
    const priceText = price ? ` (${formatPrice(price)})` : '';
    const urlText = productUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const message = encodeURIComponent(
      `Hi ${BRAND_CONFIG.name}, I am interested in "${productName}"${priceText}. Could you please share availability and ordering details?\n${urlText}`
    );
    return `${base}?text=${message}`;
  }

  const defaultMessage = encodeURIComponent(
    `Hi ${BRAND_CONFIG.name}, I would like to enquire about your jewellery catalogue.`
  );
  return `${base}?text=${defaultMessage}`;
}
