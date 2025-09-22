/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.css", // 👈 Add this since you’re using App.css
  ],
  theme: {
    extend: {
      olors: {
				...blackA,
				...mauve,
				...violet,
			},// toolbar colors for now @TODO: check later
    },
  },
  plugins: [],
}
