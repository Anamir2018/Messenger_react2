const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['ArialMt', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        bounce1: 'bounce1 2s linear infinite',
        bounce2: 'bounce2 2s linear infinite',
      },
      keyframes: {
        bounce1: {
          '0%, 100%': {
            transform: 'translateY(-200%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        bounce2: {
          '0%, 100%': {
            transform: 'translateY(-130%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      spacing: {
        5.11: '1.11rem', //right mobile
        5.18: '1.18rem', //right mobile
        5.3: '1.3rem', //right mobile
        5.62: '1.62rem', //right mobile
        5.46: '1.46rem', //right mobile
        5.37: '1.37rem', //right mobile
        5.57: '1.57rem', //right mobile
        5.83: '1.83rem', //right mobile
        20.19: '5.19rem', // left mobile
        16.18: '4.18rem', // left mobile
        16.28: '4.28rem', // left mobile
        3.2: '0.2rem', // left mobile
        3.3: '0.3rem', // left mobile
        3.36: '0.36rem', // left mobile
        3.48: '0.48rem', // left mobile
        3.46: '0.46rem', // left mobile
        3.44: '0.44rem', // left mobile
        3.85: '0.85rem', // left mobile
        3.84: '0.84rem', // left mobile
        3.9: '0.9rem', // left mobile
        3.92: '0.92rem', // left mobile
        3.97: '0.97rem', // left mobile
        8.89: '2.89rem', // left mobile
        8.26: '2.26rem', // left mobile
        8.29: '2.29rem', // left mobile
        8.33: '2.33rem', // left mobile
        12.25: '3.25rem', // left mobile
        12.87: '3.87rem', // left mobile
        12.97: '3.97rem', // left mobile
        2021: '1.3rem', // left mobile
        2022: '25%', // left mobile
      },
      minWidth: {
        10: '2.5rem',
        9: '2.25rem',
        '1/4': '25%',
      },
      maxWidth: {
        37.84: '37.48%',
        70: '70%',
        90: '90%',
        100: '100%',
      },
      maxHeight: {
        100: '100%',
        90: '90%',
      },
      fontSize: {
        sm2: '.92rem',
        1.14: '.92rem',
      },
      padding: {
        full: '100%',
        '1/10': '10%',
        2.6: '.6rem',
      },
      colors: {
        main_color_blue: '#0085ff',
        facebook_color_blue: '#3c5a99',
        gray_a: '#aaaaaa',
        gray_e: '#eeeeee',
        gray_4: '#444444',
      },
      transitionProperty: {
        width: 'width',
      },
      scale: {
        n100: '-1',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus'],
      ring: ['hover'],
    },
  },
  plugins: [],
};
