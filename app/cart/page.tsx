// app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ${item.price} = ${item.price * item.quantity}
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

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold">Total: ${total}</p>
            <button
              onClick={() => clearCart()}
              className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition text-sm"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
