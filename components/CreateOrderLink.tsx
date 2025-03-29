"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function CreateOrderLink() {
  const router = useRouter();

  const handleCreateOrder = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Datos de ejemplo para la orden; ajústalos según los requerimientos de WooCommerce
    const orderData = {
      payment_method: "bacs",
      payment_method_title: "Transferencia bancaria",
      set_paid: false,
      billing: {
        first_name: "Juan",
        last_name: "Pérez",
        address_1: "Calle Falsa 123",
        city: "Ciudad",
        state: "Estado",
        postcode: "00000",
        country: "MX",
        email: "juan@example.com",
        phone: "5512345678",
      },
      shipping: {
        first_name: "Juan",
        last_name: "Pérez",
        address_1: "Calle Falsa 123",
        city: "Ciudad",
        state: "Estado",
        postcode: "00000",
        country: "MX",
      },
      line_items: [
        {
          product_id: 62, // Reemplaza con un ID válido de tu tienda
          quantity: 2,
        },
      ],
    };

    try {
      // Realiza la petición POST al endpoint interno "/api/orders"
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Error al crear la orden (sin respuesta detallada)"
        );
      }

      const data = await res.json();
      console.log("Orden creada:", data);

      // Si se obtuvo un ID en la respuesta, redirige a la página de seguimiento del pedido.
      if (data.id) {
        router.push(`/order/${data.id}`);
      } else {
        console.error("La respuesta no contiene ID:", data);
      }
    } catch (error) {
      console.error("Error creando la orden:", error);
    }
  };

  return (
    <a href="#" onClick={handleCreateOrder} className="text-blue-500 underline">
      Realizar Pedido
    </a>
  );
}
