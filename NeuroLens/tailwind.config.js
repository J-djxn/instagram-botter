/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        accent: '#22D3EE',
      },
    },
  },
  plugins: [],
};

