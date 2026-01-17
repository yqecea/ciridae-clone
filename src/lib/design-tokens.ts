// Design Tokens - Centralized design system constants
// Use these instead of inline styles for consistency

export const FONTS = {
    display: '"Pragmatica Cond", Arial, sans-serif',
    mono: '"Roboto Mono", monospace',
} as const;

export const COLORS = {
    bg: {
        primary: "#050505",
        secondary: "#0B0B0B",
        tertiary: "#111111",
    },
    accent: {
        primary: "#CC6437",
        hover: "#E07547",
        glow: "rgba(204, 100, 55, 0.4)",
    },
    text: {
        primary: "#FFFFFF",
        secondary: "#A0A0A0",
        muted: "#888888",
        dim: "#666666",
    },
    border: {
        subtle: "rgba(255, 255, 255, 0.1)",
        medium: "rgba(255, 255, 255, 0.3)",
    },
} as const;

export const SPACING = {
    section: {
        py: "py-24 md:py-32",
        px: "px-6",
    },
    container: "max-w-7xl mx-auto",
} as const;

export const EASING = {
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    expo: "cubic-bezier(0.19, 1, 0.22, 1)",
    smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const DURATION = {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
} as const;
