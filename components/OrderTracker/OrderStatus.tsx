import React from "react";
import Timeline from "./Timeline";

export interface Order {
  id: string;
  status: string;
  updatedAt?: string;
}

interface OrderStatusProps {
  order: Order;
}

/**
 * Componente que muestra la información básica del pedido y el progreso.
 */
const OrderStatus: React.FC<OrderStatusProps> = ({ order }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Seguimiento de Pedido #{order.id}</h2>
      <p className="mb-4">
        Estado actual: <span className="font-semibold">{order.status}</span>
      </p>
      <Timeline currentStatus={order.status} />
    </div>
  );
};

export default OrderStatus;
