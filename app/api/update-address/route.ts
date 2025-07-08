import { NextRequest, NextResponse } from "next/server";
import { updateCustomerBilling } from "@/services/wooCommerce";

// Define el body esperado en la petición
interface UpdateAddressBody {
  wooToken: string;
  billing: Record<string, unknown>;  // Ajusta según la forma real de "billing"
  email: string;
}

export async function PUT(request: NextRequest) {
  try {
    // Parseamos el cuerpo JSON directamente
    const body = (await request.json()) as UpdateAddressBody;
    const { wooToken, billing, email } = body;

    // Validación de campos obligatorios
    if (!wooToken || !billing || !email) {
      return NextResponse.json(
        { success: false, error: "Faltan parámetros: wooToken, billing o email" },
        { status: 400 }
      );
    }

    // Llamada al servicio para actualización
    const updatedData = await updateCustomerBilling(email, billing, wooToken);
    console.log("Respuesta de actualización:", updatedData);

    return NextResponse.json(
      { success: true, data: updatedData },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Normalizamos el mensaje de error
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error en update-address:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}