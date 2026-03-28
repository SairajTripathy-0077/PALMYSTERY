/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel Decorative", "serif"],
        body: ["Crimson Pro", "serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        void: "#05020f",
        arcane: "#1a0a2e",
        mystic: "#2d1b4e",
        crystal: "#c084fc",
        gold: "#f59e0b",
        ember: "#f97316",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(192, 132, 252, 0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(192, 132, 252, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
