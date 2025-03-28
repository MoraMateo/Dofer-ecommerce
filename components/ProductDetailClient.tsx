"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import AddToCartButton from "@/components/AddToCartButton";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images?: { src: string }[];
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  // Función para manejar la adición al carrito, usando la cantidad elegida
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      image: product.images?.[0]?.src,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sección de imagen */}
        <div className="relative w-full md:w-1/2 h-64 bg-white rounded-lg shadow overflow-hidden">
          <Image
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Sección de información */}
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-3xl font-bold text-dofer-blue mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            ${product.price} USD
          </p>
          <div
            className="text-gray-600 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Selección de cantidad */}
          <div className="flex items-center gap-3 mb-6">
            <label className="text-gray-700 font-medium">Cantidad:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="w-16 border rounded px-2 py-1 focus:outline-dofer-blue"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="
                bg-dofer-blue
                text-white
                px-4 py-2
                rounded
                hover:bg-dofer-yellow
                hover:text-dofer-blue
                transition
              "
            >
              Añadir al carrito
            </button>

            <Link
              href="/shop"
              className="
                border
                border-dofer-blue
                text-dofer-blue
                px-4 py-2
                rounded
                hover:bg-dofer-blue
                hover:text-white
                transition
              "
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
