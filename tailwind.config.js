const tw = require('tailwindcss/defaultTheme');

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2.5rem'
      }
    },
    fontFamily: {
      aufgang: ['Bbbaufgangostgx', 'sans-serif'],
      satoshi: ['Satoshi', 'sans-serif'],
      invader: ['Bbbinvader', 'sans-serif'],
      mono: tw.fontFamily.mono,
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '2rem',
      '2xl': '2.5rem',
    },
    extend: {
      colors: {
        // 'main-black': '#171718',
        // cta: '#FFB5A7',
        // 'main-gray': '#B1B0B6',
        // 'main-gray-light': '#EBEAF1',
        // 'main-gray-dark': '#8F8E94',
        'n0': '#EBEAF1',
        'n1': '#CBCAD2',
        'n2': '#B1B0B6',
        'n3': '#8F8E94',
        'n4': '#525157',
        'n5': '#333336',
        'n6': '#171718',
        'b1': '#FFB5A7'
      },
      backgroundImage: {
        'grain-texture': 'url(/images/grain-texture.svg)'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
