/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFE0B2", // Light Peach
          DEFAULT: "#FFB74D", // Warm Orange
          dark: "#FF9800", // Deep Orange
        },
        secondary: {
          light: "#E1BEE7", // Light Lavender
          DEFAULT: "#CE93D8", // Soft Purple
          dark: "#AB47BC", // Deep Purple
        },
        accent: {
          light: "#C8E6C9", // Mint Green
          DEFAULT: "#81C784", // Fresh Green
          dark: "#4CAF50", // Vibrant Green
        },
        background: "#FFF9E6", // Warm Cream
        surface: "#FFFFFF", // White
        text: {
          primary: "#3E2723", // Dark Brown
          secondary: "#5D4037", // Medium Brown
        },
      },
    },
  },
  plugins: [],
};
