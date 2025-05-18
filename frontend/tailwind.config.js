/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f5f2ff",
        backgroundDark: "#1A1A1D",
        main: "#3c315b",
        primary: "#ab9ff2",
        primaryHover: "#e2dffe",
        secondary: "#06ea8a",
        dark: "#0F0F12",
        dark2: "#1C1C20",
        dark3: "#1A1A1D",
        darkHover: "#3c315b",
        compulsory: "#ff0000",
      },
      backgroundImage: {
        "to-top-main": "linear-gradient(to top, #3c315b 0%, #3c315b 100%)",
        "to-top-primary": "linear-gradient(to top, #ab9ff2 0%, #ab9ff2 100%)",
        "to-top-priMain": "linear-gradient(to top, #ab9ff2 0%, #3c315b 100%)",
      },
      boxShadow: {
        shadow1: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        "inset-dual":
          "inset 3px 3px 6px 0px rgb(204, 219, 232), inset -3px -3px 6px 1px rgba(255, 255, 255, 0.5)",
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
      keyframes: {
        spinCustom: {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-custom": "spinCustom 1s linear infinite",
        "spin-slow-custom": "spinCustom 2s linear infinite",
        "spin-slower-custom": "spinCustom 4s linear infinite",
        "spin-layer": "spin 1s linear infinite",
        "spin-layer-slow": "spin 2s linear infinite",
        "spin-layer-slower": "spin 4s linear infinite",
        blob: "blob 1s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
