/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        ...colors,
        primary: '#4158D0',
        secondary: '#C850C0',
        tertiary: '#FFCC70'
      })
    },
  },
  plugins: [],
};
