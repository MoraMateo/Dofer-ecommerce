import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderStatus from '../../components/OrderTracker/OrderStatus';
import { getOrderStatus } from '../../utils/api';

/**
 * Página dinámica para mostrar el seguimiento del pedido.
 * Se extrae el orderId desde la URL y se consulta el estado del pedido.
 */
const OrderPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      // Llamada a la función que obtiene el estado del pedido
      getOrderStatus(orderId)
        .then((data) => setOrder(data))
        .catch((err) => {
          console.error(err);
          setError('Error al obtener el estado del pedido');
        });
    }
  }, [orderId]);

  if (error) return <div className="p-4">{error}</div>;
  if (!order) return <div className="p-4">Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <OrderStatus order={order} />
    </div>
  );
};

export default OrderPage;
