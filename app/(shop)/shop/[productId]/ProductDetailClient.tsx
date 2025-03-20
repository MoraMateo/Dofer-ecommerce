"use client";

import { useCartStore } from "@/store/cartStore";

export default function ProductDetailClient({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
    });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={handleAddToCart}>Añadir al carrito</button>
    </div>
  );
}
