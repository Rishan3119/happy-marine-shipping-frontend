/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      '3xl': {'max': '1500px'},
      '2xl': {'max': '1280px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1200px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '978px'},
      // => @media (max-width: 1023px) { ... }
      'Lg': {'max': '850px'},

      'md': {'max': '768px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '676px'},
      'ssm': {'max': '618px'},

      'xm':{'max':'540px'},
      'xs': {'max': '400px'}, // Custom screen size below 400px
      // => @media (max-width: 639px) { ... }
      'xxm':{'max':'370px'},
      'xxxm':{'max':'330px'},
      'XM':{'max':'269px'},
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-100': {
          animationDelay: '0.3s',
        },
        '.animation-delay-300': {
          animationDelay: '0.4s',
        },
      });
    }),
  ],
}