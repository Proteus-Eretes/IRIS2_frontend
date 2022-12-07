export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
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
        }
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        'nuxt-icon',
        'nuxt-lodash'
    ],

    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL
        }
    },

    typescript: {
        strict: true,
        shim: false
    }
});
