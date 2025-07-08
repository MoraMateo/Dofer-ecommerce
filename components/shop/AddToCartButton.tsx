"use client";

import { useCartStore, CartItem } from "@/store/cartStore";
import toast from "react-hot-toast";

interface ProductImage {
  src: string;
}

export interface Product {
  id: number | string;
  name: string;
  price: string;            // WooCommerce suele devolver precio como string
  images?: ProductImage[];  // Array opcional de imágenes
  // ...añade aquí otros campos si los necesitas
}

interface AddToCartButtonProps {
  product: Product;
}

/**
 * Botón para añadir un producto al carrito.
 * Muestra una notificación (toast) al agregar el producto.
 */
export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    const item: CartItem = {
      id: typeof product.id === "string" ? parseInt(product.id, 10) : product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.images?.[0]?.src || "/placeholder.png",
    };
    addItem(item);
    toast.success("Producto agregado al carrito", {
      duration: 3000,
      style: {
        background: "#1E3A5F",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition"
    >
      Añadir al carrito
    </button>
  );
}
