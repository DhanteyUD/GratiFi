/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f5f2ff",
        main: "#3c315b",
        primary: "#ab9ff2",
        primaryHover: "#e2dffe",
        secondary: "#06ea8a",
      },
      backgroundImage: {
        "to-top-main": "linear-gradient(to top, #3c315b 0%, #3c315b 100%)",
        "to-top-priMain": "linear-gradient(to top, #ab9ff2 0%, #3c315b 100%)",
      },
      boxShadow: {
        shadow1: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
      },
      fontFamily: {
        prata: ["Prata", "serif"],
        pacifico: ["Pacifico", "cursive"],
        calSans: ["Cal Sans", "san-serif"],
        outfit: ["Outfit", "san-serif"],
        raleway: ["Raleway", "san-serif"],
        openSans: ["Open Sans", "san-serif"],
        grotesk: ["Host Grotesk", "san-serif"],
        jetBrains: ["JetBrains Mono", "monospace"],
        jakarta: ["Plus Jakarta", "san-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
