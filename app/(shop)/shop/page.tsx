import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/wooCommerce";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner / Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-dofer-blue mb-4">
          Tienda de Impresión 3D
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explora nuestra amplia selección de productos para impresión 3D:
          filamentos, herramientas y más. Calidad profesional para todos tus
          proyectos.
        </p>
      </header>

      {/* Grid de tarjetas de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
          >
            {/* Imagen del producto */}
            <div className="relative h-56 w-full">
              <Image
                src={product.images?.[0]?.src || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            {/* Información del producto */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-lg text-dofer-blue font-bold mb-4">
                ${product.price} USD
              </p>
              <Link
                href={`/shop/${product.id}`}
                className="mt-auto inline-block bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition text-sm font-semibold"
              >
                Ver Detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
