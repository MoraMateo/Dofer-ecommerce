// utils/renderAddress.tsx
import React from "react";

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
  email?: string;
}

/**
 * Renderiza una dirección: genera una lista <ul> con los campos no vacíos.
 * Si todos los campos están vacíos, muestra el mensaje "No hay dirección registrada."
 */
export function renderAddress(address: Address | null | undefined, emptyMsg: string) {
  if (!address) {
    return <p className="text-gray-500">{emptyMsg}</p>;
  }

  const lines: string[] = [];

  // Construimos el nombre completo si existe
  const fullName = [address.first_name, address.last_name].filter(Boolean).join(" ");
  if (fullName.trim()) {
    lines.push(fullName);
  }
  if (address.address_1) lines.push(address.address_1);
  if (address.address_2) lines.push(address.address_2);
  if (address.city || address.postcode) {
    lines.push([address.city, address.postcode].filter(Boolean).join(", "));
  }
  if (address.state || address.country) {
    lines.push([address.state, address.country].filter(Boolean).join(", "));
  }
  if (address.phone) {
    lines.push(`Tel: ${address.phone}`);
  }

  if (lines.length === 0) {
    return <p className="text-gray-500">{emptyMsg}</p>;
  }

  return (
    <ul className="text-gray-700">
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}
