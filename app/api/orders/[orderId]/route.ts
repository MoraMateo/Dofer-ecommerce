/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getOrderStatus } from "@/services/wooCommerce";

interface ContextParams {
  params: {
    orderId: string;
  };
}

// GET /api/orders/[orderId]
export async function GET(
  _request: Request,
  { params }: ContextParams
) {
  const { orderId } = params;
  try {
    const data = await getOrderStatus(orderId);
    if (!data) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error en GET /api/orders/[orderId]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/orders/[orderId] - no implementado
export async function PUT(
  _request: Request,
  _context: ContextParams
) {
  return NextResponse.json(
    { message: "PUT /api/orders/[orderId] no implementado" },
    { status: 501 }
  );
}

// DELETE /api/orders/[orderId] - no implementado
export async function DELETE(
  _request: Request,
  _context: ContextParams
) {
  return NextResponse.json(
    { message: "DELETE /api/orders/[orderId] no implementado" },
    { status: 501 }
  );
}
