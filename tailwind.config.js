/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.css", // 👈 Add this since you’re using App.css
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
