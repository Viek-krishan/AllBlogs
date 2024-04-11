/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        redBg: "url('./images/bgImage.png')",
      },
    },
  },
  plugins: [],
};


