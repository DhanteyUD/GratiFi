/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f4f2f4",
        main: "#3c315b",
        primary: "#ab9ff2",
        primaryHover: "#e2dffe",
      },
      fontFamily: {
        prata: ["Prata", "serif"],
        pacifico: ["Pacifico", "cursive"],
        calSans: ["Cal Sans", "san-serif"],
        outfit: ["Outfit", "san-serif"],
        raleway: ["Raleway", "san-serif"],
        openSans: ["Open Sans", "san-serif"],
        grotesk: ["Host Grotesk", "san-serif"],
        jakarta: ["Plus Jakarta", "san-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
