"use client";

import { useState } from "react";
import { createCategory } from "@/services/wooCommerce";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(""); // Campo para la URL de la imagen

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Si se ingresa una URL, crea el objeto de imagen; de lo contrario, déjalo undefined.
    const image = imageURL.trim() ? { src: imageURL.trim() } : undefined;
    const categoryData = { name, slug, description, image };
    
    try {
      await createCategory(categoryData);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-dofer-blue mb-4">Crear Categoría</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Slug (opcional) */}
        <div>
          <label className="block text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="(opcional)"
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Descripción (opcional) */}
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="(opcional)"
            rows={3}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Campo para URL de imagen */}
        <div>
          <label className="block text-gray-700">URL de la imagen (opcional)</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Ejemplo: https://ejemplo.com/imagen.jpg"
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
          <p className="text-xs text-gray-500">
            Ingresa la URL de la imagen que representará la categoría.
          </p>
        </div>
        <button
          type="submit"
          className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition"
        >
          Crear Categoría
        </button>
      </form>
    </div>
  );
}
