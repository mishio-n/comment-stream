/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        telop: {
          '0%': {
            transform: 'translateX(100%)'
          },
          '50%, 100%': {
            transform: 'translateX(0%)'
          }
        }
      },
      animation: {
        telop: 'telop 9s ease-out'
      }
    }
  },
  plugins: []
}
