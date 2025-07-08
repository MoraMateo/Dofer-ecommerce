// app/order/[orderId]/route.ts
import { NextResponse } from "next/server";
import { getOrderStatus } from "@/services/wooCommerce";

// GET /api/order/[orderId]
export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  try {
    const data = await getOrderStatus(orderId);
    if (!data) {
      return NextResponse.json(
        { error: `Pedido ${orderId} no encontrado` },
        { status: 404 }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error en GET /api/order/${orderId}:`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/order/[orderId] – no implementado
export async function PUT() {
  return NextResponse.json(
    { message: "PUT no implementado" },
    { status: 501 }
  );
}

// DELETE /api/order/[orderId] – no implementado
export async function DELETE() {
  return NextResponse.json(
    { message: "DELETE no implementado" },
    { status: 501 }
  );
}
