/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9f0',
          100: '#faf0d7',
          200: '#f4dfaa',
          300: '#ecc872',
          400: '#e3ad3f',
          500: '#c9922a',
          600: '#b07820',
          700: '#8d5c1c',
          800: '#734a1d',
          900: '#5f3d1b',
        },
        cream: {
          50:  '#fefdf9',
          100: '#fdf9ef',
          200: '#faf2d8',
          300: '#f5e7b8',
          400: '#edd48c',
          500: '#e3bb5e',
        },
        charcoal: {
          900: '#1a1612',
          800: '#2d2520',
          700: '#3f342c',
          600: '#574840',
          500: '#7a6a60',
        },
        blush: {
          100: '#fdf0f0',
          200: '#f8d8d8',
          300: '#f0b8b8',
          400: '#e49090',
          500: '#d46e6e',
        },
        sage: {
          100: '#f0f4f0',
          200: '#d8e4d8',
          300: '#b4ccb4',
          400: '#8aae8a',
          500: '#628e62',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        'dm-sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        'screen-70': '70vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #c9922a 0%, #e3ad3f 40%, #c9922a 60%, #b07820 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(26,22,18,0.3) 0%, rgba(26,22,18,0.6) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 146, 42, 0.25)',
        'gold-lg': '0 8px 40px rgba(201, 146, 42, 0.35)',
        'luxury': '0 20px 60px rgba(26, 22, 18, 0.15)',
        'card': '0 4px 24px rgba(26, 22, 18, 0.08)',
      },
    },
  },
  plugins: [],
}
