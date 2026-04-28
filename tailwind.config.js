/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        cinema: {
          dark: "#1c1a26",
          darker: "#13111d",
          surface: "#2a2735",
          card: "#252230",
          footer: "#2f2c35",
          purple: "#D0BCFF",
          "purple-dim": "#cdc2dc",
          accent: "#f3b8b5",
          "accent-glow": "#a78bfa",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica Neue", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
