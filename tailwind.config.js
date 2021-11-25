const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			primary: colors.blueGray,
			secondary: colors.cyan,
			success: colors.emerald,
			danger: colors.rose,
			warning: colors.yellow,
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
