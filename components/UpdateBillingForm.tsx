// components/UpdateBillingForm.tsx
"use client";
import React, { useState, FormEvent } from "react";

export interface Billing {
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

interface UpdateBillingFormProps {
  wooToken: string;
  userEmail: string;
  initialBilling?: Billing;
  onUpdate: (newBilling: Billing) => void;
}

const UpdateBillingForm: React.FC<UpdateBillingFormProps> = ({ wooToken, userEmail, initialBilling, onUpdate }) => {
  const [billing, setBilling] = useState<Billing>(initialBilling || {});
  const [message, setMessage] = useState<string>("");

  const handleChange = (field: keyof Billing, value: string) => {
    setBilling(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/update-address", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wooToken, billing, email: userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Dirección de facturación actualizada correctamente.");
        onUpdate(billing);
      } else {
        let errorMessage: string;
        const errorData = data.error;
        if (typeof errorData === 'object' && errorData !== null) {
          const errObj = errorData as Record<string, unknown>;
          errorMessage = typeof errObj.message === 'string'
            ? errObj.message
            : JSON.stringify(errObj);
        } else {
          errorMessage = String(errorData || "Error al actualizar dirección.");
        }
        setMessage(errorMessage);
      }
    } catch (err: unknown) {
      console.error("Error en update-address:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setMessage(errMsg || "Error al actualizar dirección.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold">Dirección de Facturación</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={billing.first_name || ""}
          onChange={e => handleChange("first_name", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={billing.last_name || ""}
          onChange={e => handleChange("last_name", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Dirección 1"
          value={billing.address_1 || ""}
          onChange={e => handleChange("address_1", e.target.value)}
          className="border rounded px-3 py-2 col-span-2"
        />
        <input
          type="text"
          placeholder="Dirección 2 (opcional)"
          value={billing.address_2 || ""}
          onChange={e => handleChange("address_2", e.target.value)}
          className="border rounded px-3 py-2 col-span-2"
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={billing.city || ""}
          onChange={e => handleChange("city", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={billing.postcode || ""}
          onChange={e => handleChange("postcode", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Estado"
          value={billing.state || ""}
          onChange={e => handleChange("state", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="País"
          value={billing.country || ""}
          onChange={e => handleChange("country", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={billing.phone || ""}
          onChange={e => handleChange("phone", e.target.value)}
          className="border rounded px-3 py-2 col-span-2"
        />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Guardar cambios
      </button>
      {message && <p className="mt-2 text-center text-green-600">{message}</p>}
    </form>
  );
};

export default UpdateBillingForm;
