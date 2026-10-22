import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF5',
        ivory: '#F5F0E8',
        'brand-dark': '#2C2418',
        'brand-brown': '#5C4A32',
        'brand-gold': '#C9A96E',
        'warm-gray': '#8A7D6B',
        'brand-border': '#E8E0D4',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [forms],
} satisfies Config;
