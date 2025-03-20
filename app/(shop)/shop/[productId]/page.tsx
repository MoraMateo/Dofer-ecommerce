import { getProductById } from "@/services/wooCommerce";

interface ProductDetailProps {
  params: { productId: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const product = await getProductById(params.productId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-700">{product.price} USD</p>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
      {/* Botón para añadir al carrito */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Añadir al carrito
      </button>
    </div>
  );
}
