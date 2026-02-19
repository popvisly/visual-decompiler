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
                    DEFAULT: "#F6F1E7", // bone
                    alt: "#f0f0ec",
                },
                surface: {
                    DEFAULT: "#FBF7EF", // ivory
                    raised: "#FFFFFF",
                    muted: "#f2f1ee",
                },
                accent: {
                    DEFAULT: "rgba(20,20,20,0.06)", // warm highlight (was acid-lime)
                    muted: "rgba(20,20,20,0.03)",
                    glow: "rgba(20,20,20,0.06)",
                },
                txt: {
                    primary: "#141414", // ink
                    secondary: "#6B6B6B", // muted
                    muted: "#9a9a94",
                    "on-dark": "#f5f5f0", // keeping for any residual dark elements
                    "on-dark-muted": "rgba(245, 245, 240, 0.5)",
                },
                line: {
                    DEFAULT: "#E7DED1", // warm border line
                }
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
