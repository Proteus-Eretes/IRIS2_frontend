import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: 'IRIS',
        meta: [{ name: 'theme-color', content: '#3E5366' }],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/assets/img/favicon.ico'
            }
        ]
    },
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {}
                }
            }
        }
    },
    buildModules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/eslint-module'],

    publicRuntimeConfig: {
        BASE_URL: process.env.BASE_URL
    }
});
