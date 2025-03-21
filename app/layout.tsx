"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css"; // Importa tus estilos globales

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        {/* Encabezado con menú */}
        <header className="bg-white shadow">
          <nav className="container mx-auto flex items-center justify-between h-16 px-4">
            {/* Logo + Nombre */}
            <div className="flex items-center gap-2">
              <Image
                src="/dofer-logo.png"
                alt="Dofer Logo"
                width={40}
                height={40}
              />
              <Link
                href="/"
                className="text-2xl font-bold text-dofer-blue hover:text-dofer-yellow transition"
              >
                DOFER
              </Link>
            </div>

            {/* Menú en pantallas medianas/grandes */}
            <div className="hidden md:flex gap-6 font-medium">
              <Link href="/shop" className="hover:text-dofer-blue transition">
                Tienda
              </Link>
              <Link href="/cart" className="hover:text-dofer-blue transition">
                Carrito
              </Link>
              <Link href="#" className="hover:text-dofer-blue transition">
                Contacto
              </Link>
            </div>

            {/* Botón hamburguesa en pantallas pequeñas */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6 text-dofer-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
          </nav>

          {/* Menú desplegable en pantallas pequeñas */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow px-4 py-2">
              <Link
                href="/shop"
                className="block py-1 text-gray-700 hover:text-dofer-blue transition"
                onClick={() => setMenuOpen(false)}
              >
                Tienda
              </Link>
              <Link
                href="/cart"
                className="block py-1 text-gray-700 hover:text-dofer-blue transition"
                onClick={() => setMenuOpen(false)}
              >
                Carrito
              </Link>
              <Link
                href="#"
                className="block py-1 text-gray-700 hover:text-dofer-blue transition"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <main className="container mx-auto px-4 py-6 flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-dofer-blue text-white py-4">
          <div className="container mx-auto text-center text-sm">
            &copy; {new Date().getFullYear()} DOFER. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
