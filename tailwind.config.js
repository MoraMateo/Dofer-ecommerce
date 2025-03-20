/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",     // Pages Router (si lo usas)
    "./components/**/*.{js,ts,jsx,tsx}" // Componentes
  ],
  theme: {
    extend: {
      colors: {
        "dofer-blue": "#1E3A5F",
        "dofer-yellow": "#FBC02D",
      },
    },
  },
  plugins: [],
};
