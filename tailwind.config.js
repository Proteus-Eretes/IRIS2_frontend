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
			primary: {
				DEFAULT: '#3E5366',
				50: '#B7C5D3',
				100: '#A7B9C9',
				200: '#87A0B6',
				300: '#6786A3',
				400: '#516D86',
				500: '#3E5366',
				600: '#293743',
				700: '#141A20',
				800: '#000000',
				900: '#000000',
			},
			secondary: {
				DEFAULT: '#439ABA',
				50: '#EBF4F8',
				100: '#D8EAF1',
				200: '#B3D6E3',
				300: '#8DC2D6',
				400: '#68AEC8',
				500: '#439ABA',
				600: '#347891',
				700: '#255668',
				800: '#16343E',
				900: '#081115',
			},
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
