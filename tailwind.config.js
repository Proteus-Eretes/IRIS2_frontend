const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './assets/css/*.{css}'
        // './nuxt.config.{js,ts}'
    ],
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
            gray: colors.gray
        },
        extend: {
            gridTemplateColumns: {
                '2/3': '1fr 2fr'
            },
            minWidth: {
                5: '1.25rem',
                '1/4': '25%',
                '1/3': '33%',
                'single-column': '100%',
                'multiple-column': 'calc(50% - 1rem)'
            },
            width: {
                'side-bar-collapse': '4rem',
                'side-bar': '16rem',
                'main-content': 'calc(100vw - 16rem)'
            },
            minHeight: {
                5: '1.25rem'
            },
            maxHeight: {
                '1/2-screen': '50vh'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp')
    ]
};
