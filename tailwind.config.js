/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#227A33',
          darkGreen: '#145A21',
          black: '#09090B',
          light: '#F8FAFC',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        hover: '0 10px 40px -4px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
