// app/(shop)/checkout/page.tsx
"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleCheckout = async () => {
    try {
      const orderData = {
        line_items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        // Otros datos: dirección de envío, cliente, etc.
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("Pedido creado:", result);
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {/* Muestra items del carrito, formulario de dirección, etc. */}
      <button onClick={handleCheckout}>Crear Pedido</button>
    </div>
  );
}
