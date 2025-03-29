// app/checkout/page.tsx
"use client";
import React from "react";
import CreateOrderLink from "@/components/CreateOrderLink";

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      {/* Al hacer clic, crea la orden (POST /api/orders) y redirige a /order/[id] */}
      <CreateOrderLink />
    </div>
  );
}
