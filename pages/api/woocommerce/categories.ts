import type { NextApiRequest, NextApiResponse } from "next";
import { getCategories } from "@/services/wooCommerce"; // Usa tu módulo real

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await getCategories();

    const formatted = categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
    }));

    res.status(200).json(formatted);
  } catch (error: any) {
    console.error("Error al obtener categorías:", error.message);
    res.status(500).json({ error: "Error interno al cargar categorías" });
  }
}
