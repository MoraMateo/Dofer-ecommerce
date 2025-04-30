"use client";

import { useEffect, useState } from "react";
import { UploadCloud, SendHorizonal } from "lucide-react";

export default function QuoteRequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ Cotización enviada con éxito. Te responderemos en 2-5 días.");
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setFile(null);
      } else {
        setMessage("❌ Hubo un error al enviar la cotización.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error inesperado al enviar la cotización.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-dofer-blue mb-2 text-center">Solicita tu Cotización</h1>
        <p className="text-center text-gray-600 mb-6">
          Adjunta tus archivos o describe tu idea. Respondemos entre 2-5 días hábiles.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:outline-dofer-blue"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:outline-dofer-blue"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Teléfono</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:outline-dofer-blue"
              placeholder="55 1234 5678"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Descripción del Proyecto</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full mt-1 px-4 py-2 rounded-xl border focus:outline-dofer-blue"
              placeholder="Describe la pieza o el uso que necesitas..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Archivo (STL, JPG, PNG...)</label>
            <label className="flex items-center gap-3 cursor-pointer mt-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50">
              <UploadCloud className="w-5 h-5 text-dofer-blue" />
              {isClient && (
                <span className="text-gray-700">
                  {file ? file.name : "Seleccionar archivo..."}
                </span>
              )}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-dofer-blue text-white font-semibold py-2 rounded-xl hover:bg-dofer-yellow transition-all"
          >
            {loading ? "Enviando..." : "Enviar Cotización"}
            <SendHorizonal size={18} />
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center text-sm font-medium text-dofer-blue">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
