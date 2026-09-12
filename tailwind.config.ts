import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A85A18",
          dark: "#8A4A12",
          light: "#C47840",
        },
        dark: "#222222",
        charcoal: "#4A4A4A",
        "warm-white": "#FAF9F6",
        beige: "#F2ECE4",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(.22,1,.36,1)",
      },
      transitionDuration: {
        micro: "200ms",
        normal: "400ms",
        cinematic: "900ms",
        hero: "1600ms",
      },
      animation: {
        "scroll-line": "scrollLine 2s cubic-bezier(.22,1,.36,1) infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(.22,1,.36,1) forwards",
      },
      keyframes: {
        scrollLine: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
