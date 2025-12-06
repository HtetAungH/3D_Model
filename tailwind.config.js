/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        golos: ['"Golos Text"', "sans-serif"],
      },
      colors: {
        dark: "#0F0F0F",
        accent: "#D6F844",
        grey: "#949494",
        "nav-bg": "#515151",
        "main-text": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
