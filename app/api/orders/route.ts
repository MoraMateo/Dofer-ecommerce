// app/api/orders/route.ts
import { createOrder } from "@/services/wooCommerce";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const order = await createOrder(orderData);
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
