/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e11d48", // red tone from logo
        dark: "#111827",     // near-black for text and contrast
        light: "#f9fafb",    // very light background
        accent: "#f43f5e",   // optional brighter red-pink
      },
    },
  },
  plugins: [],
};
