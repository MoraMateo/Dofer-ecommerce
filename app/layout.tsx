import "./globals.css";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOFER 3D",
  description: "Tienda de impresión 3D - DOFER",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <nav className="container mx-auto flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-3">
              <Image
                src="/dofer-logo.png" // Esta ruta sale de /public/dofer-logo.png
                alt="Dofer Logo"
                width={50}
                height={50}
              />
              <a href="/" className="text-2xl font-bold text-dofer-blue">
                DOFER
              </a>
            </div>
            <ul className="flex gap-6 font-medium">
              <li>
                <a className="text-dofer-blue transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-dofer-blue transition">
                  Tienda
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-dofer-blue transition">
                  Carrito
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-dofer-blue transition">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto flex-grow px-4 py-6">
          {children}
        </main>

        <footer className="bg-dofer-blue text-white py-4 mt-8">
          <div className="container mx-auto text-center text-sm">
            &copy; {new Date().getFullYear()} DOFER. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
