import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/wooCommerce";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Banner / Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-dofer-blue mb-4">
          Tienda de Impresión 3D
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explora nuestra amplia selección de productos: filamentos, herramientas y más. Calidad profesional para todos tus proyectos de impresión 3D.
        </p>
      </header>

      {/* Grid de tarjetas de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col"
          >
            {/* Imagen del producto */}
            <div className="relative h-56 w-full">
              <Image
                src={product.images?.[0]?.src || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>

            {/* Información del producto */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {product.name}
              </h2>
              <p className="text-dofer-blue font-bold text-lg mb-4">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(product.price)}
              </p>
              <Link
                href={`/shop/${product.id}`}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-dofer-blue text-white px-4 py-2 rounded-lg hover:bg-dofer-yellow hover:text-dofer-blue transition font-medium text-sm"
              >
                Ver Detalle
                {/* Heroicon: Arrow Right */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
