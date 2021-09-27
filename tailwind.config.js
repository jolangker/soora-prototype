module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,vue,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        bebas: "'Bebas Neue', cursive",
        open: "'Open Sans', sans-serif",
      },
      colors: {
        azure: "#007CFF",
        nickel: "#929292",
      },
      backgroundImage: {
        intro: "url('/src/assets/intro.jpg')",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["group-focus"],
      div: ["focus"],
    },
  },
  plugins: [],
};
