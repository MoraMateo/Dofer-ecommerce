// app/orders/[orderId]/OrderTracking.tsx  (componente cliente)
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function OrderTracking() {
  const { orderId } = useParams(); // parámetro dinámico de la ruta
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setStatus(data.status);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [orderId]);

  return (
    <div>
      <h1>Estado del pedido</h1>
      <p>{status || 'Cargando...'}</p>
    </div>
  );
}
