"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCategoryById, updateCategory } from "@/services/wooCommerce";

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [category, setCategory] = useState<any>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      const cat = await getCategoryById(id);
      setCategory(cat);
      setName(cat.name);
      setSlug(cat.slug);
      setDescription(cat.description);
    }
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCategory(id, { name, slug, description });
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  if (!category) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-dofer-blue mb-4">Editar Categoría</h1>
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
          <label className="block text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        <button
          type="submit"
          className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition"
        >
          Actualizar Categoría
        </button>
      </form>
    </div>
  );
}
