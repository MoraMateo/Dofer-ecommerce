"use client";

import { useState } from "react";

export default function QuoteRequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("Cotización enviada con éxito. Te responderemos en 2-5 días.");
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setFile(null);
      } else {
        setMessage("Hubo un error al enviar la cotización.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al enviar la cotización.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dofer-blue mb-4">Solicitar Cotización</h1>
      <p className="text-gray-700 mb-6">
        Envía tus archivos o propuestas para imprimir tus piezas. Las cotizaciones se responden en 2-5 días.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Teléfono */}
        <div>
          <label className="block text-gray-700">Teléfono:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Descripción del Proyecto */}
        <div>
          <label className="block text-gray-700">Descripción del Proyecto:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-dofer-blue"
          />
        </div>
        {/* Adjuntar Archivo(s) */}
        <div>
          <label className="block text-gray-700">Adjuntar Archivo(s):</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-dofer-blue text-white px-4 py-2 rounded hover:bg-dofer-yellow transition"
        >
          Enviar Cotización
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
}
