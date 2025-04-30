// layout.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentYear, setCurrentYear] = useState<string>("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow z-40 sticky top-0 md:fixed md:w-full">
          <nav className="w-full flex items-center justify-between gap-4 h-auto md:h-20 px-4 sm:px-6 md:px-12 xl:px-20 py-3 md:py-0">
            {/* Logo */}
            <div className="flex items-center gap-2 min-w-fit">
              <Image
                src="/dofer-logo-sintexto.svg"
                alt="Dofer Logo"
                width={30}
                height={30}
              />
              <Link
                href="/"
                className="text-2xl sm:text-3xl font-bold text-dofer-blue hover:text-dofer-yellow transition"
              >
                DOFER
              </Link>
            </div>

            {/* Centro: Búsqueda */}
            <div className="flex-1 hidden md:flex items-center max-w-lg mx-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-4 w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-grow py-2 text-sm focus:outline-none"
                />
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-dofer-blue focus:outline-none"
                aria-label="Menú móvil"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Navegación derecha (desktop) */}
            <div className="hidden md:flex items-center gap-6 font-medium min-w-fit">
              <Link href="/profile" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                <svg className="w-7 h-7 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
                <span className="hidden md:inline">Perfil</span>
              </Link>
              <Link href="/shop" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                <svg className="w-7 h-7 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M4 7h16l-1.5 9H5.5L4 7z" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
                <span className="hidden md:inline">Tienda</span>
              </Link>
              <Link href="/quotes" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                <svg className="w-7 h-7 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8h2a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2z" />
                </svg>
                <span className="hidden md:inline">Cotizar</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                <svg className="w-7 h-7 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
                <span className="hidden md:inline">Carrito</span>
              </Link>
            </div>
          </nav>

          {/* Menú móvil desplegable */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow px-4 pt-2 pb-4 animate-slide-down">
              <div className="flex flex-col space-y-4 items-start">
                <Link href="/profile" className="flex items-center gap-2 text-dofer-blue" onClick={() => setMenuOpen(false)}>
                  👤 <span>Perfil</span>
                </Link>
                <Link href="/shop" className="flex items-center gap-2 text-dofer-blue" onClick={() => setMenuOpen(false)}>
                  🛒 <span>Tienda</span>
                </Link>
                <Link href="/quotes" className="flex items-center gap-2 text-dofer-blue" onClick={() => setMenuOpen(false)}>
                  🧾 <span>Cotizar</span>
                </Link>
                <Link href="/cart" className="flex items-center gap-2 text-dofer-blue" onClick={() => setMenuOpen(false)}>
                  🧺 <span>Carrito</span>
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <main className="w-full px-4 sm:px-6 md:px-12 xl:px-20 pt-28 pb-6 flex-grow">
          <SessionProvider>{children}</SessionProvider>
        </main>

        {/* Footer Mejorado */}
        <footer className="bg-neutral-900 text-white pt-12 pb-6">
          <div className="w-full px-6 md:px-12 xl:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h2 className="text-2xl font-bold tracking-wide mb-4">DOFER</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Especialistas en impresión 3D y soluciones tecnológicas. Calidad y personalización en cada proyecto.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Navegación</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li><Link href="/profile" className="hover:text-white transition">👤 Perfil</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">🛒 Tienda</Link></li>
                <li><Link href="/cart" className="hover:text-white transition">🧺 Carrito</Link></li>
                <li><Link href="/quotes" className="hover:text-white transition">🧾 Cotizar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
              <p className="flex items-center gap-2 text-sm text-neutral-300 mb-2">📧 contacto@dofer.com.mx</p>
              <p className="flex items-center gap-2 text-sm text-neutral-300">📞 +52 981 199 1564</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-4 text-neutral-300 text-xl">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition">📘</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">📸</a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
            &copy; {currentYear} DOFER. Todos los derechos reservados.
          </div>
        </footer>

        <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />
      </body>
    </html>
  );
}