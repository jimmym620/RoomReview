/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        colors: {
            primary: "#F3F9D2",
            secondary: "#93827F",
            tertiary: "#BDC4A7",
            neutral: "#2F2F2F",
            accent: "#92B4A7",
            black: "#000000",
            white: "#FFFFFF",
        },
    },
    plugins: [],
};
