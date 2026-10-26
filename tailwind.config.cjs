/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4efe4",
        ink: "#16130f",
        tomato: "#ef4b32",
        lilac: "#a99bff",
        lime: "#d8f650",
        mint: "#8fdcb2",
        butter: "#ffd95a",
      },
      fontFamily: {
        display: ['"Bagel Fat One"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        sticker: "3px 3px 0 0 #16130f",
        "sticker-lg": "6px 6px 0 0 #16130f",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
