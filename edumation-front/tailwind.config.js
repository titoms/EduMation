/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        navy: '#003366',
        secondary: '#777777',
        terciary: '#00a1b2',
      },
    },
  },
  plugins: [],
};
