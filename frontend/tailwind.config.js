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
        "custom-gradient1":
          "linear-gradient(91.27deg, #0B76D9 -8.03%, #B500D2 104.12%)",
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
  plugins: [],
};
