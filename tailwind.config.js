/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#1D4ED8',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}