/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "system-ui"],
			},
			colors: {
				"background-color": "#0d1117",
				"second-background-color": "#161b22",
				"input-background-color": "#21262d",
				"main-text": "#ecf2f8",
				"second-text": "#89929b",
			},
		},
	},
	plugins: [],
}
