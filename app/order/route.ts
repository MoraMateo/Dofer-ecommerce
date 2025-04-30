// app/order/[orderId]/route.ts
import { NextResponse } from "next/server";
import { getOrderStatus } from "@/services/wooCommerce";

interface ContextParams {
  params: {
    orderId: string;
  };
}

// Maneja GET /api/order/[orderId]
export async function GET(request: Request, context: ContextParams) {
  const { orderId } = context.params;
  try {
    const data = await getOrderStatus(orderId);

    if (!data) {
      return NextResponse.json(
        { error: `Pedido ${orderId} no encontrado` },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error en GET /api/order/[orderId]:", error);
    return NextResponse.json(
      { error: error.message || "Error al obtener el pedido" },
      { status: 500 }
    );
  }
}

// Si quisieras manejar PUT, DELETE, etc., también podrías definirlos:
export async function PUT(request: Request, context: ContextParams) {
  // Lógica para actualizar el pedido
  return NextResponse.json({ message: "PUT no implementado" }, { status: 501 });
}

export async function DELETE(request: Request, context: ContextParams) {
  // Lógica para eliminar el pedido
  return NextResponse.json({ message: "DELETE no implementado" }, { status: 501 });
}
