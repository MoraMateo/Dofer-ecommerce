"use client";

import Image from "next/image";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: { src: string };
}

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Tomamos solo las 3 o 4 que quieras mostrar. Ajusta si deseas más.
  const mainCategories = categories.slice(0, 3);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-dofer-blue mb-8 text-center">
        CATEGORÍAS
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {mainCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded shadow hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
          >
            <div className="relative w-full h-52 bg-gray-100 rounded-t overflow-hidden">
              <Image
                src={cat.image?.src || "/placeholder.png"}
                alt={cat.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {cat.count} productos
              </p>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="mt-auto inline-block bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition text-sm font-semibold"
              >
                Ver todo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
