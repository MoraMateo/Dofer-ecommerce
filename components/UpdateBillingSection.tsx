// components/UpdateBillingSection.tsx
"use client";
import React, { useState } from "react";
import UpdateBillingForm, { Billing } from "./UpdateBillingForm";

interface UpdateBillingSectionProps {
  wooToken?: string;
  initialBilling?: Billing;
  userEmail: string; // Nuevo: email del usuario
}

export default function UpdateBillingSection({ wooToken, initialBilling, userEmail }: UpdateBillingSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [currentBilling, setCurrentBilling] = useState<Billing | undefined>(initialBilling);

  if (!wooToken) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500">No dispones de token para actualizar direcciones.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Actualizar Dirección de Facturación</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-blue-600 hover:underline"
        >
          {showForm ? "Cancelar" : currentBilling ? "Editar" : "Agregar"}
        </button>
      </div>
      {showForm && (
        <UpdateBillingForm
          wooToken={wooToken}
          userEmail={userEmail}  // Pasamos el email
          initialBilling={currentBilling}
          onUpdate={(newBilling: Billing) => {
            setCurrentBilling(newBilling);
            setShowForm(false);
          }}
        />
      )}
      {!showForm && !currentBilling && (
        <p className="text-gray-500">No hay dirección de facturación registrada.</p>
      )}
    </div>
  );
}
