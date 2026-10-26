import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ziba by Nidhi design tokens
        page: '#FAFAFA',
        card: '#FFFFFF',
        'near-black': '#18181B', // zinc-900
        'brand-accent': '#D46A7E', // muted blush / rose [CONFIRM]
        'brand-accent-hover': '#BC5568',
        'brand-accent-light': '#FDF2F4',
        'brand-muted': '#71717A', // zinc-500
        'brand-border': '#E4E4E7', // zinc-200
        // Legacy token mappings to avoid breaking other files
        cream: '#FAFAFA',
        ivory: '#F4F4F5',
        'brand-dark': '#18181B',
        'brand-brown': '#D46A7E',
        'brand-gold': '#D46A7E',
        'warm-gray': '#71717A',
      },
      fontFamily: {
        // Single sans-serif family for everything
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [forms],
} satisfies Config;
