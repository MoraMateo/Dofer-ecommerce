import { NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const buffer = await req.arrayBuffer();
  const nodeBuffer = Buffer.from(buffer);
  const stream = Readable.from(nodeBuffer);

  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });

    form.parse(stream as any, (err: any, fields: Fields, files: Files) => {
      if (err) {
        console.error("Error al parsear el formulario:", err);
        return reject(
          NextResponse.json(
            { error: "Error al procesar la cotización" },
            { status: 500 }
          )
        );
      }

      console.log("Campos:", fields);
      console.log("Archivos:", files);

      resolve(
        NextResponse.json(
          { message: "Cotización enviada con éxito" },
          { status: 201 }
        )
      );
    });
  });
}
