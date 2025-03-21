import Image from "next/image";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: {
    src: string;
  };
}

interface CategoriesSectionProps {
  categories: Category[];
}

/**
 * Muestra una sección con 3 categorías principales.
 * Cada tarjeta incluye imagen, nombre, número de productos y botón "Ver todo".
 */
export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Tomamos solo las 3 primeras categorías (ajusta según necesites).
  const mainCategories = categories.slice(0, 3);

  return (
    <section className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-dofer-blue mb-4">
        CATEGORÍAS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mainCategories.map((cat) => (
          <div
            key={cat.id}
            className="relative bg-white rounded shadow p-4 hover:shadow-lg transition flex flex-col"
          >
            {/* Imagen de la categoría */}
            <div className="relative w-full h-40 mb-4 overflow-hidden rounded">
              <Image
                src={cat.image?.src || "/placeholder.png"}
                alt={cat.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Nombre y número de productos */}
            <h3 className="text-lg font-semibold text-gray-800 mb-1 flex-grow">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {cat.count} productos
            </p>

            {/* Botón "Ver todo" */}
            <Link
              href={`/categoria/${cat.slug}`}
              className="mt-auto inline-block bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition text-sm font-semibold"
            >
              Ver todo
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
