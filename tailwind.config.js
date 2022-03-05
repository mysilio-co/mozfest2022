module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        echeveria: "#9fae6f",
        ember: "#d44d51",
        ocean: "#2d6da6",
        aloe: "#579f89",
        apricot: "#f29d58",
        salmon: "#e56b56",

        "my-green": "#0e90a3",
        "my-yellow": "#f2b822",
        "my-dark-green": "#0c7a8a",
        "my-orange": "#f27a22",
        "my-yellow": "#f2b822",
        "my-purple": "#944c7d",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
}
