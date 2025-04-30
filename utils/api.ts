// utils/api.ts
export async function getOrderStatus(orderId: string) {
  // Ajusta la URL si necesitas llamar a un servicio externo
  // Si la lógica es local, podrías directamente retornar datos mock
  const endpoint = `https://dofer.com.mx/orders/${orderId}`; 
  // O si se trata de WooCommerce:
  // const endpoint = `https://tudominio.com/wp-json/wc/v3/orders/${orderId}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Error en la respuesta de la red");
    }
    const orderData = await response.json();
    return orderData;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
}
