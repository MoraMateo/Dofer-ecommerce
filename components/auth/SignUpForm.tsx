"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        const message = typeof data.error === 'string'
          ? data.error
          : (data.error instanceof Object && 'message' in data.error)
            ? (data.error as Record<string, unknown>).message as string
            : "Error al registrar usuario";
        throw new Error(message);
      }

      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (err: unknown) {
      console.error("Error en registro:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Tu nombre"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="email@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="********"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Registrarme
      </button>
    </form>
  );
}
