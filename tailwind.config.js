/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'aquaelm-blue': '#002D72',
        'aquaelm-blue-light': '#0047AB',
        'aquaelm-accent': '#7EB8FF',
        'aquaelm-accent-soft': '#5C9FE8',
        'gh-gold': '#002D72',
        'gh-brown': '#002D72',
        'gh-dark': '#121212',
        'gh-sand': '#f9f6f0',
      },
      fontFamily: {
        sans: ['"El Messiri"', 'serif'],
        ivy: ['"El Messiri"', 'serif'],
        assistant: ['"El Messiri"', 'serif'],
        helvetica: ['"El Messiri"', 'serif'],
      },
      keyframes: {
        'scroll-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '60%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        }
      },
      animation: {
        'scroll-down': 'scroll-down 2s cubic-bezier(0.15, 0.85, 0.45, 1) infinite',
      }
    },
  },
  plugins: [],
};
