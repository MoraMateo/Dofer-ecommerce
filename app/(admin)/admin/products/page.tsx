import { getProducts } from "@/services/wooCommerce";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-dofer-blue mb-6">Listado de Productos</h1>
      <Link
        href="/admin/products/new"
        className="inline-block bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition mb-4"
      >
        Crear Producto
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price} USD</p>
            <Link
              href={`/admin/products/${product.id}`}
              className="inline-block bg-dofer-blue text-white px-3 py-1 rounded hover:bg-dofer-yellow transition text-sm"
            >
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
