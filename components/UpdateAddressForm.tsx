// components/UpdateAddressForm.tsx
"use client";
import React, { useState } from "react";

interface Address {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
}

interface UpdateAddressFormProps {
  wooToken: string; // Token de WooCommerce para autorización
  initialBilling?: Address;
  initialShipping?: Address;
}

export default function UpdateAddressForm({ wooToken, initialBilling, initialShipping }: UpdateAddressFormProps) {
  const [billing, setBilling] = useState<Address>(initialBilling || {});
  const [shipping, setShipping] = useState<Address>(initialShipping || {});
  const [message, setMessage] = useState<string>("");

  const handleChange = (section: "billing" | "shipping", field: keyof Address, value: string) => {
    if (section === "billing") {
      setBilling(prev => ({ ...prev, [field]: value }));
    } else {
      setShipping(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/update-address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wooToken,
          billing,
          shipping,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Direcciones actualizadas correctamente.");
      } else {
        setMessage(data.error || "Error al actualizar direcciones.");
      }
    } catch (error: any) {
      console.error("Error en update-address:", error);
      setMessage("Error al actualizar direcciones.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold">Actualizar Direcciones</h2>

      <div>
        <h3 className="text-xl font-semibold mb-2">Facturación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={billing.first_name || ""}
            onChange={(e) => handleChange("billing", "first_name", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={billing.last_name || ""}
            onChange={(e) => handleChange("billing", "last_name", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Dirección 1"
            value={billing.address_1 || ""}
            onChange={(e) => handleChange("billing", "address_1", e.target.value)}
            className="border rounded px-3 py-2 col-span-2"
          />
          <input
            type="text"
            placeholder="Dirección 2"
            value={billing.address_2 || ""}
            onChange={(e) => handleChange("billing", "address_2", e.target.value)}
            className="border rounded px-3 py-2 col-span-2"
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={billing.city || ""}
            onChange={(e) => handleChange("billing", "city", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={billing.postcode || ""}
            onChange={(e) => handleChange("billing", "postcode", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Estado"
            value={billing.state || ""}
            onChange={(e) => handleChange("billing", "state", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="País"
            value={billing.country || ""}
            onChange={(e) => handleChange("billing", "country", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={billing.phone || ""}
            onChange={(e) => handleChange("billing", "phone", e.target.value)}
            className="border rounded px-3 py-2 col-span-2"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Envío</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={shipping.first_name || ""}
            onChange={(e) => handleChange("shipping", "first_name", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={shipping.last_name || ""}
            onChange={(e) => handleChange("shipping", "last_name", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Dirección 1"
            value={shipping.address_1 || ""}
            onChange={(e) => handleChange("shipping", "address_1", e.target.value)}
            className="border rounded px-3 py-2 col-span-2"
          />
          <input
            type="text"
            placeholder="Dirección 2"
            value={shipping.address_2 || ""}
            onChange={(e) => handleChange("shipping", "address_2", e.target.value)}
            className="border rounded px-3 py-2 col-span-2"
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={shipping.city || ""}
            onChange={(e) => handleChange("shipping", "city", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={shipping.postcode || ""}
            onChange={(e) => handleChange("shipping", "postcode", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Estado"
            value={shipping.state || ""}
            onChange={(e) => handleChange("shipping", "state", e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="País"
            value={shipping.country || ""}
            onChange={(e) => handleChange("shipping", "country", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Guardar cambios
      </button>

      {message && <p className="mt-2 text-center text-green-600">{message}</p>}
    </form>
  );
}
