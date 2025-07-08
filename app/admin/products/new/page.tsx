"use client";

import { useState, useEffect } from "react";
import { createProduct } from "@/services/wooCommerce";
import { useRouter } from "next/navigation";

// Interfaz para definir el payload de creación de producto
interface ProductCreatePayload {
  name: string;
  slug?: string;
  type: "simple" | "variable" | "grouped" | "external";
  regular_price?: string;
  sale_price?: string;
  description: string;
  short_description: string;
  sku?: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  manage_stock: boolean;
  stock_quantity?: number;
  categories?: { id: number }[];
  images?: { src: string }[];
}

export default function NewProductPage() {
  const router = useRouter();

  // Estados del formulario
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [type, setType] = useState<ProductCreatePayload["type"]>("simple");
  const [regularPrice, setRegularPrice] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [stockStatus, setStockStatus] = useState<ProductCreatePayload["stock_status"]>("instock");
  const [manageStock, setManageStock] = useState<boolean>(false);
  const [stockQuantity, setStockQuantity] = useState<string>("0");

  const [categories, setCategories] = useState<number[]>([]);
  const [availableCategories, setAvailableCategories] = useState<{ id: number; name: string }[]>([]);
  const [images, setImages] = useState<{ src: string }[]>([]);

  // Cargar categorías disponibles
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/woocommerce/categories");
        const data: { id: number; name: string }[] = await res.json();
        setAvailableCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    }
    fetchCategories();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ProductCreatePayload = {
      name,
      type,
      description,
      short_description: shortDescription,
      stock_status: stockStatus,
      manage_stock: manageStock,
    };
    if (slug) payload.slug = slug;
    if (regularPrice) payload.regular_price = regularPrice;
    if (salePrice) payload.sale_price = salePrice;
    if (sku) payload.sku = sku;
    if (manageStock) payload.stock_quantity = parseInt(stockQuantity, 10) || 0;
    if (categories.length) payload.categories = categories.map((id) => ({ id }));
    if (images.length) payload.images = images;

    try {
      await createProduct(payload);
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
            onChange={(e) => setType(e.target.value as ProductCreatePayload["type"])}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          >
            <option value="simple">Simple</option>
            <option value="variable">Variable</option>
            <option value="grouped">Agrupado</option>
            <option value="external">Externo</option>
          </select>
        </div>

        {/* Precio Regular y Oferta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Descripciones */}
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
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

        {/* SKU y Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div>
            <label className="block text-gray-700">Estado de Stock</label>
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value as ProductCreatePayload["stock_status"])}
              className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            >
              <option value="instock">En stock</option>
              <option value="outofstock">Agotado</option>
              <option value="onbackorder">Bajo pedido</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={manageStock}
            onChange={(e) => setManageStock(e.target.checked)}
          />
          <label className="text-gray-700">¿Manejar stock?</label>
        </div>
        {manageStock && (
          <div>
            <label className="block text-gray-700">Cantidad en Stock</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            />
          </div>
        )}

        {/* Categorías */}
        <div>
          <label className="block text-gray-700">Categorías</label>
          <select
            multiple
            value={categories.map(String)}
            onChange={(e) => setCategories(
              Array.from(e.target.selectedOptions).map(opt => parseInt(opt.value))
            )}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          >
            {availableCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500">Puedes seleccionar varias con Ctrl/Cmd.</p>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-gray-700">URLs de Imágenes (separadas por comas)</label>
          <input
            type="text"
            value={images.map(i => i.src).join(", ")}
            onChange={(e) => setImages(
              e.target.value.split(",").map(s => ({ src: s.trim() }))
            )}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
            placeholder="https://ejemplo.com/img1.jpg, https://img2.jpg"
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
