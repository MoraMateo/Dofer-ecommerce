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
  price: string;
  regular_price?: string;
  sale_price?: string;
  description?: string;
  short_description?: string;
  images?: WooImage[];
  stock_status?: string;
  manage_stock?: boolean;
  stock_quantity?: number;
  sku?: string;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const isInStock = product.stock_status === "instock";
  const hasSale = product.sale_price && product.sale_price !== "";
  const finalPrice = hasSale ? product.sale_price : product.price;
  const images = product.images && product.images.length > 0 ? product.images : [{ src: "/placeholder.png" }];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Imágenes */}
        <div className="space-y-4">
          <div className="w-full max-w-md mx-auto bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-4">
            <Image
              src={images[selectedImage].src}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain w-full h-auto transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>


          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-lg border-2 transition-all 
                    ${selectedImage === index ? "border-dofer-blue ring-2 ring-dofer-blue/30" : "border-transparent hover:border-gray-300"}`}
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

        {/* Info producto */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

          <div className="text-3xl font-bold">
            {hasSale ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-xl">
                  ${product.regular_price}
                </span>
                <span className="text-dofer-blue">${finalPrice} MXN</span>
              </div>
            ) : (
              <span className="text-dofer-blue">${finalPrice} MXN</span>
            )}
          </div>

          {product.stock_status && (
            <div className="text-sm font-medium">
              <span className={isInStock ? "text-green-600" : "text-red-500"}>
                {isInStock ? "✅ En Stock" : "❌ Agotado"}
              </span>
              {product.manage_stock && product.stock_quantity !== undefined && (
                <span className="ml-2 text-gray-600">
                  (Quedan {product.stock_quantity})
                </span>
              )}
            </div>
          )}

          {product.sku && (
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          )}

          {product.short_description && (
            <div
              className="text-gray-700 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          {product.description && (
            <div
              className="prose prose-sm prose-dofer max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          {/* Acciones */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />

            <Link
              href="/shop"
              className="inline-block px-5 py-2 rounded-lg border border-dofer-blue text-dofer-blue hover:bg-dofer-blue hover:text-white transition-colors"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
