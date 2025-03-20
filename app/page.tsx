// app/page.tsx
export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-dofer-blue to-dofer-yellow text-white rounded-lg overflow-hidden mb-8">
        <div className="p-12 sm:p-24">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Impresión 3D a tu Alcance
          </h1>
          <p className="mb-8 max-w-lg">
            Crea prototipos, piezas únicas y proyectos increíbles con nuestra
            tienda de impresión 3D. Calidad profesional y variedad de productos.
          </p>
          <a
            href="/shop"
            className="bg-white text-dofer-blue px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
          >
            Ver Productos
          </a>
        </div>
      </section>

      {/* Sección de Destacados */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Tarjetas de producto "destacado" */}
          <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Filamento PLA Premium</h3>
            <p className="text-sm text-gray-600">
              Ideal para prototipos de alta calidad.
            </p>
            <button className="mt-4 bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition">
              Ver más
            </button>
          </div>

          <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Kit de Herramientas 3D</h3>
            <p className="text-sm text-gray-600">
              Todo lo que necesitas para post-procesar.
            </p>
            <button className="mt-4 bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition">
              Ver más
            </button>
          </div>

          <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Impresora 3D XYZ Pro</h3>
            <p className="text-sm text-gray-600">
              Para proyectos profesionales de gran tamaño.
            </p>
            <button className="mt-4 bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition">
              Ver más
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
