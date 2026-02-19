import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                canvas: {
                    DEFAULT: "#fafaf7",
                    alt: "#f0f0ec",
                },
                surface: {
                    DEFAULT: "#1a1a1a",
                    raised: "#242424",
                    muted: "#2a2a2a",
                },
                accent: {
                    DEFAULT: "#d4ff00",
                    muted: "rgba(212, 255, 0, 0.15)",
                    glow: "rgba(212, 255, 0, 0.3)",
                },
                txt: {
                    primary: "#1a1a1a",
                    secondary: "#6b6b6b",
                    muted: "#9a9a94",
                    "on-dark": "#f5f5f0",
                    "on-dark-muted": "rgba(245, 245, 240, 0.5)",
                },
            },
            fontFamily: {
                sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
            },
            borderRadius: {
                '2xl': '16px',
                '3xl': '24px',
            },
        },
    },
    plugins: [],
} satisfies Config;
