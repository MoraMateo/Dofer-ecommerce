"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [contactEmail, setContactEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "MX",
  });
  const [shippingMethod, setShippingMethod] = useState<"envio" | "recoger">("envio");
  const [paymentMethod, setPaymentMethod] = useState<"tarjeta" | "paypal" | "transferencia">("tarjeta");

  // Calcular totales
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.16; // IVA 16%
  const shippingCost = shippingMethod === "envio" ? 150 : 0;
  const total = subtotal + tax + shippingCost;

  const handleCheckout = () => {
    // Aquí integrarías tu lógica para procesar el pedido
    console.log({
      contactEmail,
      subscribe,
      shippingInfo,
      shippingMethod,
      paymentMethod,
      items,
      total,
    });
    // Ejemplo: Redirigir a una página de confirmación o integrar con la pasarela de pago
    alert("Pedido procesado. Revisa la consola para ver los datos.");
    // clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Tu carrito está vacío</h1>
        <Link
          href="/shop"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-900">Checkout</h1>

      {/* Sección de Contacto */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Información de Contacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Recibir ofertas y novedades</span>
          </div>
        </div>
      </section>

      {/* Sección de Envío */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de Envío</h2>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Elige tu método de entrega:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shippingMethod"
                value="envio"
                checked={shippingMethod === "envio"}
                onChange={() => setShippingMethod("envio")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>Envío a domicilio</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shippingMethod"
                value="recoger"
                checked={shippingMethod === "recoger"}
                onChange={() => setShippingMethod("recoger")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>Recoger en tienda</span>
            </label>
          </div>
        </div>
        {shippingMethod === "envio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre y Apellido</label>
              <input
                type="text"
                value={shippingInfo.name}
                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
              <input
                type="text"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="9810000000"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Dirección 1</label>
              <input
                type="text"
                value={shippingInfo.address1}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address1: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Calle Principal 123"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Dirección 2 (opcional)</label>
              <input
                type="text"
                value={shippingInfo.address2}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address2: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Interior, Departamento, etc."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Ciudad</label>
              <input
                type="text"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Ciudad"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Estado/Región</label>
              <input
                type="text"
                value={shippingInfo.state}
                onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Estado o región"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Código Postal</label>
              <input
                type="text"
                value={shippingInfo.postcode}
                onChange={(e) => setShippingInfo({ ...shippingInfo, postcode: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Código Postal"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">País</label>
              <input
                type="text"
                value={shippingInfo.country}
                onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="MX"
              />
            </div>
          </div>
        )}
      </section>

      {/* Resumen del Pedido */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Tu Pedido</h2>
        <div className="space-y-4 mb-6">
          {items.map((item) => {
            const lineTotal = item.price * item.quantity;
            return (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-2">
                <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">${lineTotal.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>IVA (16%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Envío:</span>
            <span>{shippingMethod === "envio" ? "$150.00" : "$0.00"}</span>
          </div>
          <div className="flex justify-between font-bold text-xl text-gray-900 mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Métodos de Pago */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Método de Pago</h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="tarjeta"
              checked={paymentMethod === "tarjeta"}
              onChange={() => setPaymentMethod("tarjeta")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Tarjeta de Crédito/Débito</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">PayPal</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="transferencia"
              checked={paymentMethod === "transferencia"}
              onChange={() => setPaymentMethod("transferencia")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Transferencia Bancaria</span>
          </label>
        </div>
      </section>

      {/* Botón para confirmar compra */}
      <div className="text-center">
        <button
          onClick={handleCheckout}
          className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-bold hover:bg-blue-700 transition"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}
