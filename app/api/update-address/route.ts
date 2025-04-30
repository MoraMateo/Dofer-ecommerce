// app/api/update-address/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateCustomerBilling } from "@/services/wooCommerce";

export async function PUT(request: NextRequest) {
  try {
    // Leer el cuerpo en forma de texto para depuración
    const rawBody = await request.text();
    console.log("Raw body:", rawBody);

    // Parsear el JSON
    const { wooToken, billing, email } = JSON.parse(rawBody);
    console.log("Parsed body:", { wooToken, billing, email });

    if (!wooToken || !billing || !email) {
      return NextResponse.json(
        { success: false, error: "Faltan parámetros: wooToken, billing o email" },
        { status: 400 }
      );
    }

    // Llamar al método del servicio para actualizar la dirección de facturación
    const updatedData = await updateCustomerBilling(email, billing, wooToken);
    console.log("Respuesta de actualización:", updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    const errData = error.response?.data || error.message;
    console.error("Error en update-address:", errData);
    return NextResponse.json({ success: false, error: errData }, { status: 400 });
  }
}
