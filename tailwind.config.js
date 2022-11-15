const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Control dark pseudo-selector by ancestor's "dark" class
  darkMode: "class",
  // Scan these files for Tailwind classes
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Necessary color utilities
      transparent: colors.transparent,
      current: colors.current,
      // Primary accent color
      primary: colors.blue,
      // Grayscale
      gray: colors.zinc,
      // Gradient colors
      neon: {
        blue: colors.blue[500],
        pink: colors.pink[500],
        purple: colors.purple[500],
        teal: colors.teal[400],
        green: colors.green[500],
        sky: colors.sky[500],
        amber: colors.amber[500],
        red: colors.red[500],
      },
    },
    extend: {
      fontFamily: {
        sans: ["Avenir Next", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
