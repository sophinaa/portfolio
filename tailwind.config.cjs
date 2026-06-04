/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#80a3a2",
        secondary: "#abcecf",
        tertiary: "#abcecf",
        "black-100": "#c4dce0",
        "black-200": "#abcecf",
        "white-100": "#daf4f5",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #80a3a2",
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
