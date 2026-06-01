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
                green: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },
                accent: {
                    500: '#FF7E5F',
                    600: '#e66a4d',
                },
                background: {
                    dark: '#0a0a0a',
                    darker: '#16213e',
                    darkest: '#0f0f1a',
                    card: 'rgba(22, 33, 62, 0.5)',
                },
                border: {
                    DEFAULT: '#374151',
                    hover: '#0175C2',
                },
                glass: {
                    DEFAULT: 'rgba(255, 255, 255, 0.05)',
                    hover: 'rgba(255, 255, 255, 0.08)',
                    border: 'rgba(255, 255, 255, 0.1)',
                    'border-hover': 'rgba(255, 255, 255, 0.2)',
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
            backdropBlur: {
                xs: '2px',
                sm: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
                '2xl': '40px',
                '3xl': '64px',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
                    '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 15s ease infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'slide-up': 'slide-up 0.6s ease-out forwards',
            },
        },
    },
    plugins: [],
}
