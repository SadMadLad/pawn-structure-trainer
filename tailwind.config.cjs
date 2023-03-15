/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // From chess.com
        'chess': {
          'green': '#7fa650',
          'dark': '#312e2b',
          'darker': '#272522',
        }
      },
    },
  },
  plugins: [],
}
