/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./lib/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['"Playfair Display"', "serif"],
                dmsans: ['"DM Sans"', "sans-serif"],
            },
            colors: {
                brand: { DEFAULT: "#EB8A2C", hover: "#D97A1B" },
                surface: {
                    white: "#FFFFFF",
                    light: "#F5F2EF",
                    warm: "#E9E2DB",
                    dark: "#545454",
                },
                ink: { DEFAULT: "#1A1A1A", muted: "#5C5C5C" },
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
                "fade-in": "fade-in 1s ease-out both",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
