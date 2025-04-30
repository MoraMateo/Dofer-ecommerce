// app/order/[orderId]/page.tsx
import React from "react";
import OrderTracking from "@/components/OrderTracking";

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Detalle del Pedido</h1>
      <OrderTracking orderId={params.orderId} pollInterval={5000} />
    </div>
  );
}
