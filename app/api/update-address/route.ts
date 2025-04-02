// app/api/update-address/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(request: NextRequest) {
  try {
    const { wooToken, billing, email } = await request.json();

    // Depuración: ver qué parámetros llegan
    console.log("update-address parameters:", { wooToken, billing, email });

    if (!wooToken || !billing || !email) {
      return NextResponse.json(
        { success: false, error: "Faltan parámetros: wooToken, billing o email" },
        { status: 400 }
      );
    }

    // Buscar al cliente por email
    const searchRes = await axios.get("https://wp.dofer.com.mx/wp-json/wc/v3/customers", {
      headers: {
        Authorization: `Bearer ${wooToken}`,
      },
      params: { email },
    });

    const foundCustomers = searchRes.data;
    if (!Array.isArray(foundCustomers) || foundCustomers.length === 0) {
      return NextResponse.json(
        { success: false, error: "No se encontró el cliente con ese email" },
        { status: 404 }
      );
    }

    const customerId = foundCustomers[0].id;

    // Actualizar la dirección de facturación del cliente
    const response = await axios.put(
      `https://wp.dofer.com.mx/wp-json/wc/v3/customers/${customerId}`,
      { billing },
      {
        headers: {
          Authorization: `Bearer ${wooToken}`,
        },
      }
    );

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("Error en update-address:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: "Error actualizando dirección de facturación" },
      { status: 400 }
    );
  }
}
