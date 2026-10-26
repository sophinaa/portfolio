/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    // Everything is square in pixel land
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "0",
    },
    extend: {
      colors: {
        desktop: "#2a7f7a",
        paper: "#efe9d8",
        shade: "#8a8474",
        ink: "#0b0b0b",
        navy: "#1b2a8c",
        tomato: "#ff4f8b",
        lilac: "#9d8cff",
        lime: "#7dff7a",
        mint: "#5fd4c4",
        butter: "#ffd23f",
        gold: "#e2c87a",
      },
      fontFamily: {
        display: ['"Pixelify Sans"', "system-ui", "sans-serif"],
        term: ['"VT323"', "ui-monospace", "monospace"],
        label: ['"Silkscreen"', "ui-monospace", "monospace"],
        hand: ['"Caveat"', "cursive"],
        sans: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        sticker: "4px 4px 0 0 #0b0b0b",
        "sticker-lg": "8px 8px 0 0 #0b0b0b",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
