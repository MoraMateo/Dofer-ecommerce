"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dofer-blue mb-6">
        Tu Carrito
      </h1>

      {items.length === 0 ? (
        <div className="bg-white rounded shadow p-4 text-center">
          <p className="text-gray-600 mb-4">
            No hay productos en el carrito.
          </p>
          <a
            href="/shop"
            className="inline-block bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition"
          >
            Ir a la Tienda
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Lista de items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-dofer-blue">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ${item.price} = $
                  {item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Resumen final */}
          <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => clearCart()}
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition text-sm"
              >
                Vaciar Carrito
              </button>
              <a
                href="/shop"
                className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow hover:text-dofer-blue transition text-sm"
              >
                Seguir Comprando
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
