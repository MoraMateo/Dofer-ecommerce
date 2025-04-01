"use client";

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section
      className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: "url('/banner.png')", // Ruta a tu imagen en la carpeta public
      }}
    >
      {/* Capa de degradado con tu color de marca y un poco de negro para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-dofer-blue/70 via-black/40 to-black/70"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md mb-4 leading-tight">
          Impulsa tus Ideas con Impresión 3D
        </h1>
        <p className="text-lg md:text-xl text-white drop-shadow mb-8">
          Convierte tus conceptos en realidad con filamentos de alta calidad y soporte profesional.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-white text-dofer-blue font-semibold px-6 py-3 rounded-full text-lg hover:bg-dofer-yellow hover:text-dofer-blue transition drop-shadow"
        >
          Ver Productos
        </Link>
      </div>
    </section>
  );
}
