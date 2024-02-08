/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  fontFamily: {
    Roboto: ['Roboto']
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

