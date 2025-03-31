"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentYear, setCurrentYear] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Inicializar el modo oscuro basado en las preferencias del sistema
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Aplicar las variables CSS según el modo con transición suave
  useEffect(() => {
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    if (isDarkMode) {
      document.documentElement.style.setProperty('--background', '#0a0a0a');
      document.documentElement.style.setProperty('--foreground', '#ededed');
    } else {
      document.documentElement.style.setProperty('--background', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#171717');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* Encabezado */}
        <header className={`shadow transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <nav className="container mx-auto flex items-center justify-between h-20 px-6">
            {/* Logo - Parte izquierda */}
            <div className="flex items-center gap-4">
              <div className="overflow-hidden">
                <Image
                  src="/dofer-logo.png"
                  alt="Dofer Logo"
                  width={60}
                  height={60}
                  className="rounded"
                />
              </div>
              <Link
                href="/"
                className="text-3xl font-bold hover:text-dofer-yellow transition">
                <span className="text-dofer-blue">DO</span>
                <span className="text-dofer-yellow">FER</span>
              </Link>

            </div>

            {/* Parte derecha - Controles y navegación */}
            <div className="flex items-center gap-6">
              {/* Controles de búsqueda (ahora primero) */}
              <div className="flex items-center gap-4">
                {/* Búsqueda escritorio */}
                <div className="hidden md:flex items-center gap-3">
                  {searchOpen && (
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`border rounded px-3 py-1 focus:outline-dofer-blue transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  )}
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={`p-2 rounded hover:bg-opacity-20 transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'}`}
                    aria-label="Buscar"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Menú escritorio */}
                <div className="hidden md:flex items-center gap-6 font-medium">
                  <Link href="/shop" className={`flex items-center gap-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                    </svg>
                    <span>Tienda</span>
                  </Link>
                  <Link href="/cart" className={`flex items-center gap-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                    </svg>
                    <span>Carrito</span>
                  </Link>
                  <Link href="/quotes" className={`flex items-center gap-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M3 6h18M3 12h6M3 18h6" />
                    </svg>
                    <span>Cotizar</span>
                  </Link>
                  <Link href="/contact" className={`flex items-center gap-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" />
                    </svg>
                    <span>Contacto</span>
                  </Link>
                </div>
              </div>

              {/* Controles de tema y menú móvil */}
              <div className="flex items-center gap-4">
                {/* Botón de modo oscuro */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-opacity-20 transition-colors duration-300"
                  aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6 text-dofer-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-dofer-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* Menú hamburguesa */}
                <button
                  className="md:hidden focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Abrir menú"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>

          {/* Menú móvil */}
          {menuOpen && (
            <div className={`md:hidden shadow px-4 py-2 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded px-3 py-1 focus:outline-dofer-blue ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <Link href="/shop" className={`block py-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => setMenuOpen(false)}>
                Tienda
              </Link>
              <Link href="/cart" className={`block py-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => setMenuOpen(false)}>
                Carrito
              </Link>
              <Link href="/quotes" className={`block py-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => setMenuOpen(false)}>
                Cotizar
              </Link>
              <Link href="/contact" className={`block py-1 hover:text-dofer-yellow transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <main className="container mx-auto px-4 py-6 flex-grow transition-colors duration-500">
          <SessionProvider>{children}</SessionProvider>
        </main>

        {/* Footer */}
        <footer className={`py-4 transition-colors duration-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-dofer-blue text-white'}`}>
          <div className="container mx-auto text-center text-sm">
            &copy; {currentYear} DOFER. Todos los derechos reservados.
          </div>
        </footer>

        {/* Notificaciones */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              zIndex: 9999,
              background: isDarkMode ? '#1E3A5F' : '#FFFFFF',
              color: isDarkMode ? '#EDEDED' : '#171717',
              transition: 'background-color 0.5s ease, color 0.5s ease'
            }
          }}
        />
      </body>
    </html>
  );
} 