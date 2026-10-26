import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ziba by Nidhi design tokens matching logo (watercolor peach & copper metallic)
        page: '#FAF6F2',
        card: '#FFFFFF',
        'near-black': '#2B1A15', // rich espresso calligraphy tone
        'brand-dark': '#2B1A15',
        'brand-espresso': '#2B1A15',
        'brand-accent': '#C47A53', // metallic warm copper / rose gold from logo frame
        'brand-accent-hover': '#AC643F',
        'brand-accent-light': '#F7ECE4', // soft watercolor peach wash
        'brand-copper': '#C47A53',
        'brand-peach': '#F7ECE4',
        'brand-muted': '#7D6B63', // warm taupe
        'brand-border': '#EBDCD2', // delicate copper-sand border
        // Legacy mappings
        cream: '#FAF6F2',
        ivory: '#F7ECE4',
        'brand-brown': '#C47A53',
        'brand-gold': '#C47A53',
        'warm-gray': '#7D6B63',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [forms],
} satisfies Config;
