module.exports = {
  purge: {
    content: ["./index.html", "./src/**/*.{js,ts,vue,jsx,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        bebas: "'Bebas Neue', cursive",
        open: "'Open Sans', sans-serif",
      },
      colors: {
        azure: "#409EFF",
        nickel: "#929292",
      },
      backgroundImage: {
        intro: "url('/src/assets/intro.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
