export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F5ECD2",
        secondary: "#8B1A1A",
        tertiary: "#EDE0C4",
        "black-100": "#E8D5B0",
        "black-200": "#DFC99A",
        "white-100": "#8B1A1A",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #8B1A1A33",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      fontFamily: {
        sans: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};