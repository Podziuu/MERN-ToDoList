/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-primary": "#121212",
        "black-secondary": "#1F1F1F",
        "light-grey": "#C2C2C2",
        primary: "#BB86FC",
        secondary: "#984EAF",
      },
      backgroundImage: {
        "gradient-login": "url(/src/assets/blurry-gradient-haikei.png)",
      },
      screens: {
        "3xl": "1730px",
      },
    },
  },
  plugins: [],
};
