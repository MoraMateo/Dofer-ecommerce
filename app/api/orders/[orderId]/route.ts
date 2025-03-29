// app/api/orders/[orderId]/route.ts
import { NextResponse } from "next/server";
import { getOrderStatus } from "@/services/wooCommerce";

interface ContextParams {
  params: {
    orderId: string;
  };
}

// GET /api/orders/[orderId]
export async function GET(request: Request, { params }: ContextParams) {
  try {
    const { orderId } = params;
    const data = await getOrderStatus(orderId);
    if (!data) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error en GET /api/orders/[orderId]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// (Opcional) PUT /api/orders/[orderId]
export async function PUT(request: Request, { params }: ContextParams) {
  // Aquí manejarías la actualización de un pedido
  return NextResponse.json({ message: "PUT /api/orders/[orderId] no implementado" }, { status: 501 });
}

// (Opcional) DELETE /api/orders/[orderId]
export async function DELETE(request: Request, { params }: ContextParams) {
  // Aquí manejarías la eliminación de un pedido
  return NextResponse.json({ message: "DELETE /api/orders/[orderId] no implementado" }, { status: 501 });
}
