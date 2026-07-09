import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0F",
        "ink-2": "#111118",
        "ink-3": "#1A1A26",
        slate: "#8B8FA8",
        "slate-light": "#C4C6D8",
        gold: "#E8C547",
        "gold-dim": "#A8922A",
        cream: "#F5F0E8",
        "cream-dim": "#D4CCBC",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
