/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ef',
          200: '#b3c6df',
          300: '#8ca9cf',
          400: '#668dbf',
          500: '#4070af',
          600: '#335a8c',
          700: '#264369',
          800: '#1a2d46',
          900: '#0d1623',
        },
      },
    },
  },
  plugins: [],
}