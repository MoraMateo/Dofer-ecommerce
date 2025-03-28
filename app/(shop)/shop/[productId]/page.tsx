import { getProductById } from "@/services/wooCommerce";
import ProductDetailClient from "./ProductDetailClient";

// Indica que esta ruta es completamente dinámica y desactiva el caché
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProductDetailProps {
  params: { productId: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  // Obtiene el producto según su ID
  const product = await getProductById(params.productId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Renderizamos el componente interactivo para detalle de producto */}
      <ProductDetailClient product={product} />
    </div>
  );
}
