import React from 'react';
import Timeline from './Timeline';

/**
 * Componente que muestra el estado general del pedido.
 * @param {Object} order - Objeto del pedido, por ejemplo: { id, status, updatedAt }
 */
const OrderStatus = ({ order }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Seguimiento de Pedido #{order.id}</h2>
      <p className="mb-4">
        Estado actual: <span className="font-semibold">{order.status}</span>
      </p>
      {/* Se utiliza el componente Timeline para mostrar el progreso */}
      <Timeline currentStatus={order.status} />
    </div>
  );
};

export default OrderStatus;
