"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id: number) => {
    removeItem(id);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold text-dofer-blue mb-6">Tu Carrito</h1>
        <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg mx-auto">
          <ShoppingCart className="mx-auto text-dofer-blue mb-4" size={40} />
          <p className="text-gray-600 mb-6 text-lg">Aún no has agregado productos.</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-dofer-blue text-white rounded-lg hover:bg-dofer-yellow hover:text-dofer-blue transition font-semibold text-base"
          >
            Ir a la Tienda
          </Link>
          <Link
            href="/checkout"
            className="bg-dofer-blue text-white px-5 py-2.5 rounded-lg hover:bg-dofer-yellow hover:text-dofer-blue transition font-medium text-sm"
          >
            Ir a Checkout
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Tu Carrito</h1>

      <div className="space-y-6">
        {items.map((item) => {
          const subtotal = item.price * item.quantity;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-lg transition"
            >
              <div className="w-28 h-28 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
                <p className="text-gray-500 text-sm">
                  Precio unitario: <span className="font-medium">${item.price.toFixed(2)} MXN</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Cantidad: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="mt-2 text-dofer-blue font-bold text-lg">
                  Subtotal: ${subtotal.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
              >
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          );
        })}
      </div>

      {/* Resumen */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-2xl font-bold text-gray-900">
          Total: <span className="text-dofer-blue">${total.toFixed(2)}</span>
        </p>
        <div className="flex gap-4">
          <Link
            href="/checkout"
            className="bg-dofer-blue text-white px-5 py-2.5 rounded-lg hover:bg-dofer-yellow hover:text-dofer-blue transition font-medium text-sm"
          >
            Pagar Pedido
          </Link>

          <Link
            href="/shop"
            className="bg-dofer-blue text-white px-5 py-2.5 rounded-lg hover:bg-dofer-yellow hover:text-dofer-blue transition font-medium text-sm"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
