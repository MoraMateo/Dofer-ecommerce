"use client"; // <-- Client Component para usar hooks de carrito

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: any;
}

/**
 * Muestra una tarjeta con imagen, nombre, precio
 * y botones para ver detalle o añadir al carrito.
 * Se estiliza con tus colores dofer-blue y dofer-yellow.
 */
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
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded">
        <Image
          src={product.images?.[0]?.src || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Nombre y precio */}
      <h2 className="text-lg font-semibold mb-1 text-gray-800">
        {product.name}
      </h2>
      <p className="text-sm text-gray-600 flex-grow">
        {product.price} USD
      </p>

      {/* Botones */}
      <div className="mt-4 flex gap-2">
        <Link
          href={`/shop/${product.id}`}
          className="bg-dofer-blue text-white px-3 py-1 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition text-sm"
        >
          Ver detalle
        </Link>
        <button
          onClick={handleAddToCart}
          className="bg-dofer-yellow text-dofer-blue px-3 py-1 rounded hover:bg-dofer-blue hover:text-white transition text-sm"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
