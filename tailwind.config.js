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
        'main-gray': '#B1B0B6',
        'main-gray-light': 'EBEAF1',
      },
    },
  },
  plugins: [],
};
