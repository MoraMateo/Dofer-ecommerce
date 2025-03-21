import { getProductById } from "@/services/wooCommerce";

interface ProductDetailProps {
  params: { productId: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const product = await getProductById(params.productId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado del producto */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sección de imagen (opcional si hay imágenes) */}
        <div className="flex-shrink-0 md:w-1/2 bg-white rounded shadow p-4">
          {/* 
            Ejemplo: si product.images[0]?.src existe, 
            podrías mostrar <img src={product.images[0].src} alt={product.name} />
          */}
          <img
            src="/placeholder.png"
            alt={product.name}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        {/* Sección de información */}
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-3xl font-bold text-dofer-blue mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            {product.price} USD
          </p>

          <div
            className="text-gray-600 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Botón para añadir al carrito */}
          <button className="inline-block bg-dofer-blue text-white px-5 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition mt-auto self-start">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
