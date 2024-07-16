/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#BBBBBB",
        black: "01010F",
        red: "EE1515",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
