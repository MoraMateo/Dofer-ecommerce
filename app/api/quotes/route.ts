import { NextResponse } from "next/server";

export const config = {
  api: { bodyParser: false },
};

// POST /api/quotes
export async function POST(request: Request) {
  try {
    // Usamos FormData nativo para evitar dependencias de Node
    const formData = await request.formData();
    const fields: Record<string, string> = {};
    const files: Record<string, File[]> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (!files[key]) files[key] = [];
        files[key].push(value);
      } else {
        fields[key] = value.toString();
      }
    }

    console.log("Campos:", fields);
    console.log("Archivos:", files);

    return NextResponse.json(
      { message: "Cotización enviada con éxito", data: { fields, files } },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error al procesar la cotización:", message);
    return NextResponse.json(
      { error: "Error al procesar la cotización" },
      { status: 500 }
    );
  }
}