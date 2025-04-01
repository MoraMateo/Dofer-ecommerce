"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result && !result.error) {
      console.log("🟢 Login exitoso");
      // Puedes esperar a que la sesión se actualice
      setTimeout(() => {
        console.log("📦 Token JWT Woo:", session?.user?.wooToken);
        router.push("/dashboard");
      }, 500);
    } else {
      console.log("🔴 Login fallido:", result?.error);
      setError("Credenciales inválidas");
    }

    setLoading(false);
  };

  const goToRegister = () => {
    router.push("/auth/signup");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        disabled={loading}
      >
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </button>

      <button
        type="button"
        onClick={goToRegister}
        className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
      >
        Registrarme
      </button>
    </form>
  );
}
