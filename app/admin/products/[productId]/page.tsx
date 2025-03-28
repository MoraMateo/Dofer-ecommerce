"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct } from "@/services/wooCommerce";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [product, setProduct] = useState<any>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      const prod = await getProductById(id);
      setProduct(prod);
      setName(prod.name);
      setPrice(prod.price);
    }
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(id, { name, price });
      router.push("/admin/products");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-dofer-blue mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        <div>
          <label className="block text-gray-700">Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        <button
          type="submit"
          className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition"
        >
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}
