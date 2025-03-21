import { getProducts } from "@/services/wooCommerce";

export default async function ShopPage() {
  const products = await getProducts(); // Llamada a tu API WooCommerce

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dofer-blue mb-6">
        Tienda de Impresión 3D
      </h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Explora nuestra amplia selección de productos para impresión 3D: filamentos,
        herramientas y más. Calidad profesional para todos tus proyectos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded shadow p-4 hover:shadow-lg transition flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 flex-grow">{product.price} USD</p>
            <a
              href={`/shop/${product.id}`}
              className="mt-4 inline-block bg-dofer-blue text-white px-3 py-1 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition"
            >
              Ver Detalle
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
