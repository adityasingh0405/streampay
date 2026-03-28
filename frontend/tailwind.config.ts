import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        yellow: "#FF4500", // Electric Orange
        red: "#EFEFEF", // Light Grey
        blue: "#1A1A1A", // Dark Asphalt Grey
        black: "#000000",
        white: "#FFFFFF",
        "neo-gray": "#FFFFFF", // Monochrome Background
        "neo-dark": "#111111",
      },
      boxShadow: {
        neo: "4px 4px 0px #000000",
        "neo-lg": "6px 6px 0px #000000",
        "neo-xl": "8px 8px 0px #000000",
        "neo-sm": "2px 2px 0px #000000",
        "neo-inset": "inset 4px 4px 0px #000000",
      },
      borderWidth: {
        "3": "3px",
      },
      animation: {
        "bounce-x": "bounceX 0.3s ease",
        ticker: "ticker 20s linear infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 4s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        bounceX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
