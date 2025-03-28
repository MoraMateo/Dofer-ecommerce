"use client";

import { useState } from "react";
import { createProduct } from "@/services/wooCommerce";
import { useRouter } from "next/navigation";

/**
 * Formulario para crear un producto con campos comunes de WooCommerce.
 * Ajusta según tus necesidades y la API de WooCommerce.
 */
export default function NewProductPage() {
  const router = useRouter();

  // Campos básicos
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("simple"); // simple, variable, etc.
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [sku, setSku] = useState("");
  const [stockStatus, setStockStatus] = useState("instock"); // instock, outofstock, onbackorder
  const [manageStock, setManageStock] = useState(false);
  const [stockQuantity, setStockQuantity] = useState("0");

  // Campos opcionales
  const [categories, setCategories] = useState<string[]>([]); // IDs de categorías
  const [images, setImages] = useState<{ src: string }[]>([]);

  // Manejo del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Armamos el objeto productData con los campos básicos
    const productData: any = {
      name,
      slug: slug || undefined,
      type,
      regular_price: regularPrice || undefined,
      sale_price: salePrice || undefined,
      description,
      short_description: shortDescription,
      sku: sku || undefined,
      stock_status: stockStatus,
      manage_stock: manageStock,
    };

    // Si se activa manage_stock, enviamos la cantidad de stock
    if (manageStock) {
      productData.stock_quantity = parseInt(stockQuantity, 10) || 0;
    }

    // Categorías: si tienes IDs, las pasas en un array de objetos {id: ...}
    if (categories.length > 0) {
      productData.categories = categories.map((catId) => ({ id: catId }));
    }

    // Imágenes: un array de objetos {src: "...", position: 0}, etc.
    if (images.length > 0) {
      productData.images = images;
    }

    try {
      await createProduct(productData);
      router.push("/admin/products");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-dofer-blue mb-4">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Nombre */}
        <div>
          <label className="block text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="(opcional)"
          />
        </div>

        {/* Tipo de Producto */}
        <div>
          <label className="block text-gray-700">Tipo de Producto</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          >
            <option value="simple">Simple</option>
            <option value="variable">Variable</option>
            <option value="grouped">Agrupado</option>
            <option value="external">Externo/Afiliado</option>
          </select>
        </div>

        {/* Precio Regular */}
        <div>
          <label className="block text-gray-700">Precio Regular</label>
          <input
            type="number"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="0.00"
          />
        </div>

        {/* Precio de Oferta */}
        <div>
          <label className="block text-gray-700">Precio de Oferta</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="(opcional)"
          />
        </div>

        {/* Descripción Larga */}
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>

        {/* Descripción Corta */}
        <div>
          <label className="block text-gray-700">Descripción Corta</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={2}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="(opcional)"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-gray-700">SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="(opcional)"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="block text-gray-700">Estado de Stock</label>
          <select
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          >
            <option value="instock">En stock</option>
            <option value="outofstock">Agotado</option>
            <option value="onbackorder">Bajo pedido</option>
          </select>
        </div>

        {/* Manejar Stock */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={manageStock}
            onChange={(e) => setManageStock(e.target.checked)}
          />
          <label className="text-gray-700">¿Manejar stock?</label>
        </div>

        {/* Cantidad de Stock (solo si maneja stock) */}
        {manageStock && (
          <div>
            <label className="block text-gray-700">Cantidad en Stock</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
              placeholder="0"
            />
          </div>
        )}

        {/* Categorías (IDs) */}
        <div>
          <label className="block text-gray-700">Categorías (IDs)</label>
          <input
            type="text"
            onChange={(e) => {
              // Convierte la lista separada por comas a un array de strings
              const arr = e.target.value.split(",").map((s) => s.trim());
              setCategories(arr);
            }}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="Ejemplo: 12, 15, 18"
          />
          <p className="text-xs text-gray-500">
            Ingresa los IDs de las categorías separados por comas.
          </p>
        </div>

        {/* Imágenes (src) */}
        <div>
          <label className="block text-gray-700">URLs de Imágenes (separadas por comas)</label>
          <input
            type="text"
            onChange={(e) => {
              const arr = e.target.value.split(",").map((s) => s.trim());
              // Convertimos cada url en { src: url }
              const imageObjs = arr.map((url) => ({ src: url }));
              setImages(imageObjs);
            }}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="Ejemplo: https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
          />
        </div>

        <button
          type="submit"
          className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}
