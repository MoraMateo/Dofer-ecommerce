// pages/api/woocommerce/categories.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getCategories } from "@/services/wooCommerce";

interface Category {
  id: number;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[] | { error: string }>
) {
  try {
    const raw = await getCategories();               // axios response data
    // Asegurarnos de que raw es un array y mapearlo al shape deseado
    const formatted: Category[] = Array.isArray(raw)
      ? raw.map((cat) => ({
          id: Number(cat.id),
          name: String(cat.name),
        }))
      : [];

    res.status(200).json(formatted);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error al obtener categorías:", message);
    res.status(500).json({ error: "Error interno al cargar categorías" });
  }
}
