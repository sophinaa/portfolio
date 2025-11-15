/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0d1b2a",
        secondary: "#778da9",
        tertiary: "#1b263b",
        "black-100": "#415a77",
        "black-200": "#1b263b",
        "white-100": "#e0e1dd",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #0d1b2a",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
