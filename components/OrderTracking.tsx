// components/OrderTracking.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";

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
}

interface OrderTrackingProps {
  orderId: string;
  pollInterval?: number;
}

export default function OrderTracking({ orderId, pollInterval = 5000 }: OrderTrackingProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) {
        throw new Error("Error al obtener el estado del pedido");
      }
      const data: Order = await res.json();
      setOrder(data);
      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching order status:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderStatus();
    const interval = setInterval(fetchOrderStatus, pollInterval);
    return () => clearInterval(interval);
  }, [fetchOrderStatus, pollInterval]);

  if (loading) {
    return <p className="text-gray-700">Cargando información del pedido...</p>;
  }
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
  if (!order) {
    return <p className="text-gray-700">Pedido no encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Seguimiento de Pedido #{order.id}
        </h1>
        <div className="space-y-1">
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Última actualización:</strong> {order.updatedAt || "No disponible"}</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Detalles de Pago</h2>
          <p><strong>Método:</strong> {order.payment_method_title} ({order.payment_method})</p>
          <p><strong>Pagado:</strong> {order.set_paid ? "Sí" : "No"}</p>
          {order.total && order.currency && <p><strong>Total:</strong> {order.total} {order.currency}</p>}
        </div>
        {order.billing && (
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Datos de Facturación</h2>
            <p>{order.billing.first_name} {order.billing.last_name}</p>
            <p>{order.billing.address_1}, {order.billing.city}, {order.billing.state}, {order.billing.postcode}, {order.billing.country}</p>
            <p>Email: {order.billing.email}</p>
            <p>Teléfono: {order.billing.phone}</p>
          </div>
        )}
        {order.shipping && (
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Datos de Envío</h2>
            <p>{order.shipping.first_name} {order.shipping.last_name}</p>
            <p>{order.shipping.address_1}, {order.shipping.city}, {order.shipping.state}, {order.shipping.postcode}, {order.shipping.country}</p>
          </div>
        )}
        {order.line_items && order.line_items.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Ítems del Pedido</h2>
            <table className="w-full border text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 border-b">Producto</th>
                  <th className="py-2 px-3 border-b">Cantidad</th>
                  <th className="py-2 px-3 border-b">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.line_items.map(item => (
                  <tr key={item.product_id} className="border-b">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">{item.quantity}</td>
                    <td className="py-2 px-3">{item.subtotal}</td>
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
