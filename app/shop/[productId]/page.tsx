import { getProductById } from "@/services/wooCommerce";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProductDetailProps {
  params: { productId: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const product = await getProductById(params.productId);
  return <ProductDetailClient product={product} />;
}
