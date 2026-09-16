import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          obsidian: '#050B14',
          navy: '#0B1528',
          'navy-surface': '#101E38',
          'navy-light': '#182C52',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-metallic': '#C5A059',
          'gold-subtle': 'rgba(212, 175, 55, 0.15)',
          silver: '#E2E8F0',
          steel: '#94A3B8',
          border: 'rgba(212, 175, 55, 0.22)'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF1D0 0%, #D4AF37 50%, #AA820A 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #FFFFFF 0%, #E5C358 50%, #B88E12 100%)',
        'navy-radial': 'radial-gradient(circle at 50% 0%, #152747 0%, #08101E 70%, #03070D 100%)',
        'metallic-card': 'linear-gradient(145deg, rgba(16,30,56,0.7) 0%, rgba(11,21,40,0.85) 100%)'
      }
    }
  },
  plugins: [],
};
export default config;
