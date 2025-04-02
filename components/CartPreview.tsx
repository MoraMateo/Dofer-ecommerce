// components/CartPreview.tsx
"use client";
import React, { useEffect, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number; // Precio unitario
}

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

interface CartPreviewProps {
  items: CartItem[];
}

export default function CartPreview({ items }: CartPreviewProps) {
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [loadingShipping, setLoadingShipping] = useState<boolean>(false);

  // Calcula el subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.16; // Ejemplo: 16% de IVA
  const total = subtotal + tax + shippingCost;

  // Obtener costo de envío (puede ser único o calcularse en base al carrito)
  useEffect(() => {
    async function fetchShippingCost() {
      setLoadingShipping(true);
      try {
        // Aquí podrías llamar a un endpoint que calcule el costo de envío
        // Por ahora simulamos un costo fijo
        setShippingCost(50);
      } catch (error) {
        console.error("Error obteniendo cotización de envío", error);
      } finally {
        setLoadingShipping(false);
      }
    }
    fetchShippingCost();
  }, [items]);

  // Simular obtener métodos de pago
  useEffect(() => {
    setPaymentMethods([
      { id: "card", name: "Tarjeta de Crédito", description: "Paga con Visa, MasterCard, etc." },
      { id: "paypal", name: "PayPal", description: "Paga de forma segura con PayPal." },
      { id: "transfer", name: "Transferencia Bancaria", description: "Realiza el pago mediante transferencia." }
    ]);
    setSelectedPayment("card");
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Resumen de Tu Compra</h1>

      {/* Lista de productos */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 border-b pb-2">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
            </div>
            <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Resumen financiero */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>IVA (16%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Costo de envío:</span>
          <span>{loadingShipping ? "Cargando..." : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Métodos de pago */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Métodos de Pago</h2>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <label key={method.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={() => setSelectedPayment(method.id)}
                className="form-radio"
              />
              <span>
                {method.name} <small className="text-gray-500">({method.description})</small>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón para confirmar compra */}
      <div className="text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}
