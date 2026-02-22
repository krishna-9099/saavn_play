/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f4ff',
                    100: '#b3dfff',
                    200: '#80caff',
                    300: '#4db5ff',
                    400: '#1aa0ff',
                    500: '#0175C2',
                    600: '#015e9b',
                    700: '#014774',
                    800: '#00304d',
                    900: '#001926',
                },
                secondary: {
                    50: '#e6fcff',
                    100: '#b3f5ff',
                    200: '#80efff',
                    300: '#4de8ff',
                    400: '#1ae2ff',
                    500: '#13B9FD',
                    600: '#0f94ca',
                    700: '#0b6f97',
                    800: '#074a64',
                    900: '#032531',
                },
                accent: {
                    500: '#FF7E5F',
                    600: '#e66a4d',
                },
                background: {
                    dark: '#1a1a2e',
                    darker: '#16213e',
                    darkest: '#0f0f1a',
                    card: 'rgba(22, 33, 62, 0.5)',
                },
                border: {
                    DEFAULT: '#374151',
                    hover: '#0175C2',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            spacing: {
                'sidebar-left': '280px',
                'sidebar-right': '250px',
                'header': '64px',
            },
            zIndex: {
                'sidebar': '10',
                'header': '20',
                'overlay': '30',
                'modal': '40',
                'tooltip': '50',
            },
        },
    },
    plugins: [],
}
