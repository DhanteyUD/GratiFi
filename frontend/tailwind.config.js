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
        "to-top-primary": "linear-gradient(to top, #ab9ff2 0%, #ab9ff2 100%)",
        "to-top-priMain": "linear-gradient(to top, #ab9ff2 0%, #3c315b 100%)",
      },
      boxShadow: {
        shadow1: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
      },
      fontFamily: {
        prata: ["Prata", "serif"],
        pacifico: ["Pacifico", "cursive"],
        calSans: ["Cal Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        grotesk: ["Host Grotesk", "sans-serif"],
        jetBrains: ["JetBrains Mono", "monospace"],
        jakarta: ["Plus Jakarta", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
