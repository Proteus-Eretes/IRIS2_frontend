import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: 'IRIS',
        meta: [
            {
                name: 'theme-color',
                content: '#06B6D4',
                media: '(prefers-color-scheme: light)'
            },
            {
                name: 'theme-color',
                content: '#06B6D4',
                media: '(prefers-color-scheme: dark)'
            }
        ],
        link: [
            {
                rel: 'icon',
                // type: 'image/x-icon',
                type: 'image/svg+xml',
                href: '/assets/img/favicon.svg',
                sizes: 'any'
            },
            {
                rel: 'mask-icon',
                href: '/assets/img/favicon.svg',
                color: '#000000',
                media: '(prefers-color-scheme: light)'
            },
            {
                rel: 'mask-icon',
                href: '/assets/img/favicon.svg',
                color: '#ffffff',
                media: '(prefers-color-scheme: dark)'
            }
            // {
            //     rel: 'apple-touch-icon',
            //     href: '/assets/img/apple-touch-icon.png'
            // }
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
    },

    typescript: {
        shim: false
    }
});
