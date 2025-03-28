// app/order/[orderId]/page.tsx

import { getOrderStatus } from "@/services/wooCommerce";

// Define la forma de los datos del pedido, según WooCommerce
interface Order {
  id: number;
  status: string;
  // ... otras propiedades
}

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = params;

  // Llamamos directamente a la función en el servidor
  // (No necesitamos fetch a /api/orders/..., podemos usar la función de wooCommerce)
  const orderData: Order = await getOrderStatus(orderId);

  if (!orderData) {
    return <div>Pedido no encontrado</div>;
  }

  return (
    <div className="p-4">
      <h1>Pedido #{orderData.id}</h1>
      <p>Estado: {orderData.status}</p>
      {/* Muestra más detalles del pedido si lo deseas */}
    </div>
  );
}
