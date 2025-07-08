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
              {/* perfil, tienda, cotizar, carrito links here */}
              <Link href="/profile" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                {/* icon and label */}Perfil
              </Link>
              <Link href="/shop" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                Tienda
              </Link>
              <Link href="/quotes" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                Cotizar
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-xs hover:text-dofer-blue md:text-sm">
                Carrito
              </Link>
            </div>
          </nav>

          {/* Menú móvil desplegable */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow px-4 pt-2 pb-4 animate-slide-down">
              <div className="flex flex-col space-y-4 items-start">
                <Link href="/profile" onClick={() => setMenuOpen(false)}>👤 Perfil</Link>
                <Link href="/shop" onClick={() => setMenuOpen(false)}>🛒 Tienda</Link>
                <Link href="/quotes" onClick={() => setMenuOpen(false)}>🧾 Cotizar</Link>
                <Link href="/cart" onClick={() => setMenuOpen(false)}>🧺 Carrito</Link>
              </div>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <main className="w-full px-4 sm:px-6 md:px-12 xl:px-20 pt-28 pb-6 flex-grow">
          <SessionProvider>{children}</SessionProvider>
        </main>

        {/* Footer */}
        <footer className="bg-neutral-900 text-white pt-12 pb-6">
          {/* footer content */}
          <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
            &copy; {currentYear} DOFER. Todos los derechos reservados.
          </div>
        </footer>

        <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />
      </body>
    </html>
  );
}
