"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/shop/AddToCartButton";


interface WooImage {
  src: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;              // precio regular o precio final
  regular_price?: string;     // precio regular
  sale_price?: string;        // precio de oferta
  description?: string;       // descripción larga (HTML)
  short_description?: string; // descripción corta (HTML)
  images?: WooImage[];
  stock_status?: string;      // instock, outofstock, onbackorder
  manage_stock?: boolean;
  stock_quantity?: number;
  sku?: string;
  // Agrega más campos si lo requieres (type, categories, etc.)
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Si el producto maneja stock y está en stock, mostramos la cantidad disponible
  const isInStock = product.stock_status === "instock";

  // Obtenemos el precio a mostrar. Si sale_price existe, lo mostramos junto al regular_price tachado.
  const hasSale = product.sale_price && product.sale_price !== "";
  const finalPrice = hasSale ? product.sale_price : product.price;

  // Manejamos múltiples imágenes. Si no hay, usamos un placeholder.
  const images = product.images && product.images.length > 0 ? product.images : [{ src: "/placeholder.png" }];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sección de imágenes */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Imagen principal */}
          <div className="relative w-full h-80 bg-white rounded-lg shadow overflow-hidden">
            <Image
              src={images[selectedImage].src}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Miniaturas si hay más de 1 imagen */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 bg-gray-100 rounded overflow-hidden 
                    border-2 ${selectedImage === index ? "border-dofer-blue" : "border-transparent"}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img.src}
                    alt={`Thumbnail ${index}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sección de información */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold text-dofer-blue mb-2">{product.name}</h1>

          {/* Precios */}
          <div className="text-2xl font-semibold mb-4">
            {hasSale ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-500 line-through">
                  ${product.regular_price}
                </span>
                <span className="text-dofer-blue">
                  ${finalPrice} USD
                </span>
              </div>
            ) : (
              <span className="text-dofer-blue">
                ${finalPrice} USD
              </span>
            )}
          </div>

          {/* Estado de Stock */}
          {product.stock_status && (
            <p
              className={`text-sm font-medium mb-2 ${
                isInStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {isInStock ? "En Stock" : "Agotado"}
              {product.manage_stock && product.stock_quantity !== undefined && (
                <span className="ml-2 text-gray-600">
                  (Quedan {product.stock_quantity})
                </span>
              )}
            </p>
          )}

          {/* Descripción corta */}
          {product.short_description && (
            <div
              className="text-gray-700 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          {/* Descripción larga */}
          {product.description && (
            <div
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          {/* SKU (opcional) */}
          {product.sku && (
            <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {/* Botón Agregar al Carrito */}
            <AddToCartButton product={product} />

            {/* Volver a la Tienda */}
            <Link
              href="/shop"
              className="inline-block border border-dofer-blue text-dofer-blue px-4 py-2 rounded hover:bg-dofer-blue hover:text-white transition"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
