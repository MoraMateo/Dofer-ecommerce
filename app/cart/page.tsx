"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();

  // Calcula el total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Función para eliminar un ítem
  const handleRemove = (id: number) => {
    removeItem(id);
  };

  // Render del carrito vacío
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-dofer-blue mb-4">Tu Carrito</h1>
        <div className="bg-white rounded shadow p-6 text-center">
          <p className="text-gray-600 mb-4">No hay productos en el carrito.</p>
          <Link
            href="/shop"
            className="inline-block bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition"
          >
            Ir a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  // Render del carrito con ítems
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dofer-blue mb-6">Tu Carrito</h1>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-gray-700">
                <th className="py-2 px-2">Producto</th>
                <th className="py-2 px-2 hidden sm:table-cell">Precio</th>
                <th className="py-2 px-2">Cantidad</th>
                <th className="py-2 px-2 text-right">Subtotal</th>
                <th className="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const subtotal = item.price * item.quantity;
                return (
                  <tr key={item.id} className="border-b last:border-none">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        {/* Imagen del producto si existe */}
                        <div className="w-16 h-16 bg-gray-100 relative rounded hidden sm:block">
                          <Image
                            src={item.image || "/placeholder.png"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <span>${item.price.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-2">
                      {/* Cantidad (solo se muestra, no editable) */}
                      <span>{item.quantity}</span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span>${subtotal.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen final */}
      <div className="bg-white rounded shadow p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-lg font-semibold text-gray-800">
          Total: <span className="text-dofer-blue">${total.toFixed(2)}</span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition text-sm"
          >
            Vaciar Carrito
          </button>
          <Link
            href="/shop"
            className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition text-sm"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
