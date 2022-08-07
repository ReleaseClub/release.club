/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        aufgang: ['Budke'],
        'satoshi-reg': ['Satoshi-Regular'],
        'satoshi-med': ['Satoshi-Medium'],
      },
      colors: {
        'main-black': '#171718',
        cta: '#FFB5A7',
        'main-gray': '#B1B0B6',
        'main-gray-light': '#EBEAF1',
        'main-gray-dark': '#8F8E94',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
