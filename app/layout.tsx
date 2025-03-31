"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // 👈 Importa SessionProvider

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
        {/* Encabezado */}
        <header className="bg-white shadow">
          <nav className="container mx-auto flex items-center justify-between h-20 px-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Image
                src="/dofer-logo.png"
                alt="Dofer Logo"
                width={60}
                height={60}
              />
              <Link
                href="/"
                className="text-3xl font-bold text-dofer-blue hover:text-dofer-yellow transition"
              >
                DOFER
              </Link>
            </div>

            {/* Búsqueda escritorio */}
            <div className="hidden md:flex items-center gap-3">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded px-3 py-1 focus:outline-dofer-blue"
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Buscar"
              >
                <svg
                  className="w-6 h-6 text-dofer-blue"
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
              <Link href="/shop" className="flex items-center gap-1 hover:text-dofer-blue transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
                <span>Tienda</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-1 hover:text-dofer-blue transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
                <span>Carrito</span>
              </Link>
              <Link href="/quotes" className="flex items-center gap-1 hover:text-dofer-blue transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M3 6h18M3 12h6M3 18h6" />
                </svg>
                <span>Cotizar</span>
              </Link>
              <Link href="/contact" className="flex items-center gap-1 hover:text-dofer-blue transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" />
                </svg>
                <span>Contacto</span>
              </Link>
            </div>

            {/* Menú hamburguesa */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6 text-dofer-blue" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
          </nav>

          {/* Menú móvil */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow px-4 py-2">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border rounded px-3 py-1 focus:outline-dofer-blue"
                />
              </div>
              <Link href="/shop" className="block py-1 text-gray-700 hover:text-dofer-blue transition" onClick={() => setMenuOpen(false)}>
                Tienda
              </Link>
              <Link href="/cart" className="block py-1 text-gray-700 hover:text-dofer-blue transition" onClick={() => setMenuOpen(false)}>
                Carrito
              </Link>
              <Link href="/quotes" className="block py-1 text-gray-700 hover:text-dofer-blue transition" onClick={() => setMenuOpen(false)}>
                Cotizar
              </Link>
              <Link href="/contact" className="block py-1 text-gray-700 hover:text-dofer-blue transition" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <main className="container mx-auto px-4 py-6 flex-grow">
        <SessionProvider>{children}</SessionProvider> {/* 👈 Aquí lo envolvemos */}
        </main>

        {/* Footer */}
        <footer className="bg-neutral-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* DOFER Info */}
            <div>
              <h2 className="text-2xl font-bold tracking-wide text-white mb-4">DOFER</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Especialistas en impresión 3D y soluciones tecnológicas. Calidad y personalización en cada proyecto.
              </p>
            </div>

            {/* Navegación */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li><a href="/shop" className="hover:text-white transition">Tienda</a></li>
                <li><a href="/cart" className="hover:text-white transition">Carrito</a></li>
                <li><a href="/quotes" className="hover:text-white transition">Cotizar</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contáctanos</h3>
              <p className="flex items-center gap-2 text-sm text-neutral-300 mb-2">
                <span>📧</span> contacto@dofer.com.mx
              </p>
              <p className="flex items-center gap-2 text-sm text-neutral-300">
                <span>📞</span> +52 981 199 1564
              </p>
            </div>

            {/* Redes Sociales */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
              <div className="flex space-x-4 text-neutral-300">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition text-xl">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
                {/* Puedes agregar más iconos como X, LinkedIn, TikTok... */}
              </div>
            </div>
          </div>

          {/* Línea inferior */}
          <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} DOFER. Todos los derechos reservados.
          </div>
        </footer>

        {/* Notificaciones */}
        <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />
      </body>
    </html>
  );
}
