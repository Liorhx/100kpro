/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        zinc: {
          800: "#1A1A1A",
          900: "#111111",
        },
        amber: {
          DEFAULT: "#FACC15",
        },
        gold: "#FACC15",
      },
    },
  },
  plugins: [],
}
