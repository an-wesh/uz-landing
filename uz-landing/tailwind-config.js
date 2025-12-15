/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pastel palette for Gen Z aesthetic
        pastel: {
          purple: '#E9D5FF',
          blue: '#DBEAFE',
          pink: '#FBCFE8',
          cyan: '#CFFAFE',
          lime: '#DCFCE7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #f3e8ff 0%, #dbeafe 50%, #fce7f3 100%)',
      },
    },
  },
  plugins: [],
};