/** @type {import('tailwindcss').Config} */

const { expand } = require('rxjs');

// Custom Colors

const COLORS = {
  portGore: {
    50: "#E2E2F4",
    100: "#CFD0EC",
    200: "#B2B4E1",
    300: "#9597D6",
    400: "#7476C9",
    500: "#565ABD",
    600: "#4044A5",
    700: "#353888",
    800: "#292C6A",
    900: "#1D1E49",
    950: "#17183B",
  },
  jaguar: {
    50: "#F6D4FC",
    100: "#F0BCFB",
    200: "#E790F8",
    300: "#DD60F5",
    400: "#D335F3",
    500: "#C70EEC",
    600: "#9E0BBC",
    700: "#7A0990",
    800: "#550665",
    900: "#31033A",
    950: "#1C0221",
  },
  violetEggplant: {
    50: "#FBE5F5",
    100: "#F6CBEB",
    200: "#ED92D6",
    300: "#E45DC2",
    400: "#DB29AF",
    500: "#A81C85",
    600: "#87176B",
    700: "#651150",
    800: "#420B34",
    900: "#23061C",
    950: "#11030E",
  },
  kimberly: {
    50: "#F2F0F5",
    100: "#E7E3ED",
    200: "#CEC7DB",
    300: "#B4A8C7",
    400: "#9B8CB5",
    500: "#8371A3",
    600: "#675685",
    700: "#4D4063",
    800: "#352C44",
    900: "#1A1622",
    950: "#0C0A0F",
  },
  snuff: {
    50: "#FCFBFD",
    100: "#FAF8FC",
    200: "#F7F4FA",
    300: "#F2EDF7",
    400: "#EFEAF6",
    500: "#EAE3F3",
    600: "#B9A2D7",
    700: "#865EBA",
    800: "#593984",
    900: "#2B1C40",
    950: "#160E20",
  },
  lima: {
    50: "#ECFBE4",
    100: "#DCF8CD",
    200: "#B5F197",
    300: "#92EB66",
    400: "#6FE434",
    500: "#52C41A",
    600: "#429E15",
    700: "#317510",
    800: "#204D0A",
    900: "#112905",
    950: "#081202",
  },
  sun: {
    50: "#FEF6E6",
    100: "#FEEFD2",
    200: "#FDDEA0",
    300: "#FCCE73",
    400: "#FBBD41",
    500: "#FAAD14",
    600: "#D28D04",
    700: "#A06C03",
    800: "#694702",
    900: "#372501",
    950: "#191101",
  },
  red: {
    50: "#FEE7E7",
    100: "#FDCECF",
    200: "#FB9D9F",
    300: "#F97173",
    400: "#F74043",
    500: "#F51014",
    600: "#C9080C",
    700: "#980609",
    800: "#620406",
    900: "#310203",
    950: "#180101",
  },
};

module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
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
      // border: {
      //   dark: {
      //     primary: COLORS.portGore[950],
      //     secondary: KIMBERLY[950],
      //     tertiary: JAGUAR[950],
      //     informative: PORT_GORE[810],
      //     positive: LIMA[950],
      //     error: RED[950],
      //     warning: SUN[950],
      //   },
      //   light: {
      //     primary: PORT_GORE[500],
      //     secondary: KIMBERLY[500],
      //     tertiary: JAGUAR[500],
      //     informative: PORT_GORE[400],
      //     positive: LIMA[900],
      //     error: RED[500],
      //     warning: SUN[500],
      //   },
      // },
      // background: {
      //   primary: PORT_GORE[950],
      //   secondary: PORT_GORE[500],
      //   tertiary: JAGUAR[900],
      //   informative: PORT_GORE[400],
      //   positive: LIMA[500],
      //   error: RED[900],
      //   warning: SUN[500],
      //   base: SNUFF[50],
      //   base200: SNUFF[200],
      //   tertiaryBase: TERTIARY[50],
      // },
    },

    fontFamily: {
      code: ["Source Code Pro", "monospace"],
      ubuntu: ["Ubuntu", "sans-serif"]
    },

    fontSize: {
      // HEADING
      'h1': ['42px', { lineHeight: '1.2', fontWeight: '500' }],
      'h2': ['36px', { lineHeight: '1.2', fontWeight: '500' }], 
      'h3': ['32px', { lineHeight: '1.2', fontWeight: '500' }],
      'h4': ['28px', { lineHeight: '1.2', fontWeight: '500' }],
      'h5': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
      'h6': ['20px', { lineHeight: '1.2', fontWeight: '500' }],
      // BODY 
      'xl': ['20px', { lineHeight: '1.2' }],
      'lg': ['18px', { lineHeight: '1.2' }],
      'md': ['16px', { lineHeight: '1.2' }],
      'sm': ['14px', { lineHeight: '1.2' }],
      'xs': ['12px', { lineHeight: '1.2' }]
    },

    fontWeight: {
      'bold': 700,
      'medium': 500,
      'light': 300,
    },

    lineHeight: {
      'normal': '1.2',
    },

    spacing: {
      xs: "0.25rem", // 4px
      sm: "0.5rem",  // 8px
      md: "1rem",    // 16px
      lg: "1.5rem",  // 24px
      xl: "2.5rem",  // 40px
      xxl: "4rem",   // 64px
    },
  },
  plugins: [require("flowbite/plugin")],
};
