const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	safelist: ['hidden', 'blocks__assign-event', 'blocks__assign-event-ghost'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			primary: colors.slate,
			secondary: colors.cyan,
			success: colors.emerald,
			danger: colors.rose,
			warning: colors.yellow,
			black: colors.black,
			white: colors.white,
			gray: colors.neutral,
		},
		extend: {
			minWidth: {
				'1/4': '25%',
				'single-column': '100%',
				'multiple-column': 'calc(50% - 2rem)',
			},
			maxHeight: {
				'1/2-screen': '50vh',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
