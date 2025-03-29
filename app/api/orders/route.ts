// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { createOrder } from "@/services/wooCommerce";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const data = await createOrder(orderData);

    if (!data) {
      return NextResponse.json({ error: "No se pudo crear la orden" }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error en POST /api/orders:", error);
    return NextResponse.json({ error: error.message || "Error creando la orden" }, { status: 500 });
  }
}

// (Opcional) Manejar GET /api/orders para listar pedidos
export async function GET() {
  // Ejemplo de una función getOrders()
  // const data = await getOrders();
  // return NextResponse.json(data, { status: 200 });
  return NextResponse.json({ message: "GET /api/orders no implementado" });
}
