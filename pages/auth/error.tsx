// pages/auth/error.tsx
import { useRouter } from "next/router";
import React from "react";

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query; // Captura el mensaje de error de la query string

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Error de Autenticación</h1>
      <p className="text-red-500">
        {error ? `Error: ${error}` : "Ha ocurrido un error desconocido."}
      </p>
      <button
        onClick={() => router.push("/auth/signin")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Volver a Iniciar Sesión
      </button>
    </div>
  );
}
