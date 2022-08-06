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
      },
      colors: {
        'main-black': '#171718',
        cta: '#FFB5A7',
        'main-grey': '#B1B0B6',
        'main-grey-light': 'EBEAF1',
      },
    },
  },
  plugins: [],
};
