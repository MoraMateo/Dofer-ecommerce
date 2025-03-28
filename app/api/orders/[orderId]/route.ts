// app/api/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getOrderStatus } from "@/services/wooCommerce"; // Ajusta la ruta según tu proyecto

/**
 * Maneja las peticiones GET a /api/orders/[orderId].
 */
export async function GET(
  request: NextRequest,
  context: { params: { orderId: string } }
) {
  const { orderId } = context.params;

  try {
    // Llama a la función que obtiene el estado del pedido en WooCommerce
    const orderData = await getOrderStatus(orderId);

    // Devuelve los datos del pedido en formato JSON
    return NextResponse.json(orderData, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el estado del pedido:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
