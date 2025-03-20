// app/shop/ProductCard.tsx
"use client"; // <-- Lo hacemos Client Component si vamos a usar hooks de carrito

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
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
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      {/* Imagen del producto */}
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.images?.[0]?.src || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      {/* Nombre y precio */}
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-600 text-sm flex-grow">
        {product.price} USD
      </p>

      {/* Botones */}
      <div className="mt-4 flex gap-2">
        <Link
          href={`/shop/${product.id}`}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition text-sm"
        >
          Ver detalle
        </Link>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
