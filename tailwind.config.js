/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // homeessentials.in exact palette
        brown: {
          50: '#fdf4ed',
          100: '#f9e8d8',
          200: '#f0d0b3',
          300: '#e8dacf',
          400: '#d6b99a',
          500: '#bd8556',
          600: '#ab755b',
          700: '#8b543d',
          800: '#724532',
          900: '#642f00',
          950: '#723400',
        },
        cream: '#fdf4ed',
        beige: '#e8dacf',
        gold: '#bf8556',
        dark: '#1a1c1d',
        body: '#2c2d2e',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        pill: '25px',
        full: '9999px',
      },
      fontFamily: {
        heading: ['"Jost"', 'sans-serif'],
        body: ['"Source Sans 3"', '"Source Sans Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
