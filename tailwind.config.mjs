import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
				serif: ["Instrument-Serif", ...defaultTheme.fontFamily.serif],
			},
			colors: {
				bgColor: "#FDFFF4",
				primary: "#00997E",
				title: "#535353",
				body: "#666",
				hoverColor: "#DEFFEB",
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss", require("@tailwindcss/typography")],
};
