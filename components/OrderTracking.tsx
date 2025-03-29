// components/OrderTracking.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Billing {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

interface Shipping {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface LineItem {
  product_id: number;
  name: string;
  quantity: number;
  subtotal: string;
}

interface Order {
  id: number;
  status: string;
  updatedAt?: string;
  total?: string;
  currency?: string;
  payment_method?: string;
  payment_method_title?: string;
  set_paid?: boolean;
  billing?: Billing;
  shipping?: Shipping;
  line_items?: LineItem[];
  // Puedes agregar otros campos según la respuesta de WooCommerce
}

interface OrderTrackingProps {
  orderId: string;
  pollInterval?: number; // en milisegundos, por defecto 5000
}

export default function OrderTracking({ orderId, pollInterval = 5000 }: OrderTrackingProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderStatus = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) {
        throw new Error("Error al obtener el estado del pedido");
      }
      const data: Order = await res.json();
      setOrder(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching order status:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Consulta inicial
    fetchOrderStatus();
    // Configura el polling
    const interval = setInterval(fetchOrderStatus, pollInterval);
    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [orderId, pollInterval]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-gray-700">Cargando información del pedido...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-gray-700">Pedido no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Seguimiento de Pedido #{order.id}
        </h1>

        <div className="space-y-1">
          <p className="text-gray-700">
            <strong>Estado:</strong> {order.status}
          </p>
          <p className="text-gray-700">
            <strong>Última actualización:</strong>{" "}
            {order.updatedAt || "No disponible"}
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">
            Detalles de Pago
          </h2>
          <p className="text-gray-700">
            <strong>Método de pago:</strong>{" "}
            {order.payment_method_title} ({order.payment_method})
          </p>
          <p className="text-gray-700">
            <strong>Pagado:</strong> {order.set_paid ? "Sí" : "No"}
          </p>
          {order.total && order.currency && (
            <p className="text-gray-700">
              <strong>Total:</strong> {order.total} {order.currency}
            </p>
          )}
        </div>

        {order.billing && (
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Datos de Facturación
            </h2>
            <p className="text-gray-700">
              {order.billing.first_name} {order.billing.last_name}
            </p>
            <p className="text-gray-700">
              {order.billing.address_1}, {order.billing.city}, {order.billing.state},{" "}
              {order.billing.postcode}, {order.billing.country}
            </p>
            <p className="text-gray-700">Email: {order.billing.email}</p>
            <p className="text-gray-700">Teléfono: {order.billing.phone}</p>
          </div>
        )}

        {order.shipping && (
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Datos de Envío
            </h2>
            <p className="text-gray-700">
              {order.shipping.first_name} {order.shipping.last_name}
            </p>
            <p className="text-gray-700">
              {order.shipping.address_1}, {order.shipping.city}, {order.shipping.state},{" "}
              {order.shipping.postcode}, {order.shipping.country}
            </p>
          </div>
        )}

        {order.line_items && order.line_items.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Ítems del Pedido
            </h2>
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-gray-600 font-semibold text-left border-b border-gray-200">
                    Producto
                  </th>
                  <th className="py-2 px-3 text-gray-600 font-semibold text-left border-b border-gray-200">
                    Cantidad
                  </th>
                  <th className="py-2 px-3 text-gray-600 font-semibold text-left border-b border-gray-200">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.line_items.map((item) => (
                  <tr key={item.product_id} className="border-b border-gray-200">
                    <td className="py-2 px-3 text-gray-700">{item.name}</td>
                    <td className="py-2 px-3 text-gray-700">{item.quantity}</td>
                    <td className="py-2 px-3 text-gray-700">{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
