// Central Theme Configuration
// This file exports all theme-related values to avoid hardcoded colors across the codebase

export const colors = {
    // Primary brand colors (Dart/Flutter blue)
    primary: {
        50: '#e6f4ff',
        100: '#b3dfff',
        200: '#80caff',
        300: '#4db5ff',
        400: '#1aa0ff',
        500: '#0175C2', // Main primary color
        600: '#015e9b',
        700: '#014774',
        800: '#00304d',
        900: '#001926',
    },

    // Secondary accent colors
    secondary: {
        50: '#e6fcff',
        100: '#b3f5ff',
        200: '#80efff',
        300: '#4de8ff',
        400: '#1ae2ff',
        500: '#13B9FD', // Main secondary color
        600: '#0f94ca',
        700: '#0b6f97',
        800: '#074a64',
        900: '#032531',
    },

    // Accent highlight color
    accent: {
        500: '#FF7E5F',
        600: '#e66a4d',
    },

    // Background colors
    background: {
        dark: '#1a1a2e',
        darker: '#16213e',
        darkest: '#0f0f1a',
        card: 'rgba(22, 33, 62, 0.5)',
        hover: 'rgba(22, 33, 62, 0.8)',
    },

    // Text colors
    text: {
        primary: '#ffffff',
        secondary: '#9ca3af',
        muted: '#6b7280',
        dark: '#1f2937',
    },

    // Border colors
    border: {
        default: '#374151',
        hover: '#0175C2',
        focus: '#13B9FD',
    },

    // Status colors
    status: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    },

    // Code syntax colors
    code: {
        keyword: '#c678dd',
        string: '#98c379',
        comment: '#5c6370',
        number: '#d19a66',
        function: '#61afef',
        variable: '#e06c75',
        class: '#e5c07b',
    },
} as const;

export const typography = {
    fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },

    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
    },

    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },

    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

export const spacing = {
    // Layout dimensions
    sidebar: {
        left: '280px',
        right: '250px',
    },
    header: {
        height: '64px',
    },
    footer: {
        height: '80px',
    },

    // Content max width
    contentMaxWidth: '1400px',

    // Breakpoints (for reference, actual breakpoints are in Tailwind config)
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    // Z-index layers
    zIndex: {
        base: 0,
        sidebar: 10,
        header: 20,
        overlay: 30,
        modal: 40,
        tooltip: 50,
    },

    // Border radius
    borderRadius: {
        none: '0',
        sm: '0.25rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        full: '9999px',
    },

    // Shadows
    boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        glow: '0 0 40px rgba(1, 117, 194, 0.3)',
        glowAccent: '0 0 40px rgba(255, 126, 95, 0.3)',
    },

    // Transitions
    transition: {
        fast: '150ms ease',
        base: '200ms ease',
        slow: '300ms ease',
    },
} as const;

// Type definitions
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Color groups with shades
export type ShadedColorGroup = {
    [key in ColorShade]?: string;
};

// Color groups without shades (direct string values)
export type DirectColorGroup = {
    [key: string]: string;
};

// Helper function to get primary color value (with shades)
export function getPrimaryColor(shade: ColorShade = 500): string {
    return colors.primary[shade] || colors.primary[500];
}

// Helper function to get secondary color value (with shades)
export function getSecondaryColor(shade: ColorShade = 500): string {
    return colors.secondary[shade] || colors.secondary[500];
}

// Helper function to get background color
export function getBackgroundColor(key: keyof typeof colors.background): string {
    return colors.background[key];
}

// Helper function to get text color
export function getTextColor(key: keyof typeof colors.text): string {
    return colors.text[key];
}

// Helper function to get status color
export function getStatusColor(key: keyof typeof colors.status): string {
    return colors.status[key];
}

// Helper function to get code syntax color
export function getCodeColor(key: keyof typeof colors.code): string {
    return colors.code[key];
}

// Export default theme object
const theme = {
    colors,
    typography,
    spacing,
};

export default theme;
