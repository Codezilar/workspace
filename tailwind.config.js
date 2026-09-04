/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080d11",
        panel: "#101820",
        line: "#26333f",
        acid: "#b7ef23",
        mist: "#aabac7",
      },
      boxShadow: { glow: "0 0 50px rgba(110,176,255,.16)" },
    },
  },
  plugins: [],
};
