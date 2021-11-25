import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	meta: {
		meta: [{ name: 'theme-color', content: '#3E5366' }],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: './assets/img/favicon.ico',
			},
		],
	},
	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {},
				},
			},
		},
	},
	buildModules: ['@pinia/nuxt'],
});
