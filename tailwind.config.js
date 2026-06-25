/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette terroir : pierre / crème, bordeaux profond, or-cuivre en accent
        cream: {
          DEFAULT: '#F6F1E7',
          50: '#FBF8F2',
          100: '#F6F1E7',
          200: '#ECE3D2',
        },
        stone: {
          warm: '#E7DECF',
          taupe: '#B7A98F',
        },
        bordeaux: {
          DEFAULT: '#5A1A22',
          deep: '#43141A',
          light: '#7A2630',
        },
        copper: {
          DEFAULT: '#B07A3C',
          light: '#C99A5B',
          gold: '#CBA24A',
        },
        ink: '#2A2422',
      },
      fontFamily: {
        // Serif éditoriale pour les titres, sans-serif lisible pour le corps
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 1.2s ease forwards',
        'slow-zoom': 'slow-zoom 18s ease-out forwards',
      },
    },
  },
  plugins: [],
}
