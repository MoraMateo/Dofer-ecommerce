"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-dofer-blue text-white p-4 ${sidebarOpen ? "block" : "hidden"} md:block w-64`}>
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="hover:underline">Dashboard</Link>
          <Link href="/admin/products" className="hover:underline">Productos</Link>
          <Link href="/admin/categories" className="hover:underline">Categorías</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-grow p-6">
        {/* Botón para pantallas pequeñas */}
        <div className="md:hidden mb-4">
          <button
            className="bg-dofer-blue text-white px-3 py-2 rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Cerrar menú" : "Abrir menú"}
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
