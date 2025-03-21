import CategoriesSection from "@/components/CategoriesSection";
import { getCategories } from "@/services/wooCommerce";

export default async function HomePage() {
  // Llamada asíncrona a getCategories
  const categories = await getCategories();

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

      {/* Sección de Categorías */}
      <CategoriesSection categories={categories} />
    </div>
  );
}
