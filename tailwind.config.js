/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Rutas del App Router de Next.js (si aplica)
    "./pages/**/*.{js,ts,jsx,tsx}",     // Páginas Next.js (si usas Pages router)
    "./components/**/*.{js,ts,jsx,tsx}" // Componentes reutilizables
  ],
  theme: {
    extend: {
      colors: {
        'dofer-blue': '#1E3A5F',
        'dofer-yellow': '#FBC02D',
      },
    },
  },
  plugins: [],
}
