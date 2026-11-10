/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0b192c',
          800: '#1e3e62',
          700: '#003161',
        },
        royal: {
          600: '#0066cc',
          500: '#1e88e5',
        },
        teal: {
          500: '#00897b',
        }
      }
    },
  },
  plugins: [],
}
