import { getProducts } from "@/services/wooCommerce";

export default async function ShopPage() {
  const products = await getProducts(); // Server Component: se llama en el servidor

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda de Impresión 3D</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.price} USD</p>
            <a href={`/shop/${product.id}`} className="text-blue-500 underline">
              Ver Detalle
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
