/** @type {import('tailwindcss').Config} */
const COLORS = require('./colors.js');

module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "32px",
        lg: "32px",
        "2xl": "120px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },

    colors: {
      ...COLORS,
      content: {
        primary: COLORS.portGore[950],
        secondary: COLORS.portGore[700],
        tertiary: COLORS.portGore[400],
        disable: COLORS.portGore[200],
        informative: COLORS.kimberly[500],
        positive: COLORS.lima[500],
        error: COLORS.red[600],
      },
    },

    fontFamily: {
      code: ["Source Code Pro", "monospace"],
      ubuntu: ["Ubuntu", "sans-serif"],
    },

    fontSize: {
      // HEADING
      h1: ["42px", { lineHeight: "1.2", fontWeight: "500" }],
      h2: ["36px", { lineHeight: "1.2", fontWeight: "500" }],
      h3: ["32px", { lineHeight: "1.2", fontWeight: "500" }],
      h4: ["28px", { lineHeight: "1.2", fontWeight: "500" }],
      h5: ["24px", { lineHeight: "1.2", fontWeight: "500" }],
      h6: ["20px", { lineHeight: "1.2", fontWeight: "500" }],
      // BODY
      xl: ["20px", { lineHeight: "1.2" }],
      lg: ["18px", { lineHeight: "1.2" }],
      md: ["16px", { lineHeight: "1.2" }],
      sm: ["14px", { lineHeight: "1.2" }],
      xs: ["12px", { lineHeight: "1.2" }],
    },

    fontWeight: {
      bold: 700,
      medium: 500,
      light: 300,
    },

    lineHeight: {
      normal: "1.2",
    },

    spacing: {
      xs: "0.25rem", // 4px
      sm: "0.5rem", // 8px
      base: "1rem", // 16px
      md: "1.5rem", // 24px
      lg: "2rem", //32px
      xl: "2.5rem", // 40px
      "2xl": "4rem", // 64px
    },
    borderRadius: {
      none: "0px",
      sm: "2px",
      DEFAULT: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
      "2xl": "16px",
      "3xl": "24px",
      full: "9999px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
