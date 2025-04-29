'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import ShippingOptions, { Rate } from '@/components/ShippingOptions'

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const [contactEmail, setContactEmail] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [shippingInfo, setShippingInfo] = useState({
    name: '', phone: '',
    address1: '', address2: '',
    city: '', state: '',
    postcode: '', country: 'MX',
  })
  const [shippingMethod, setShippingMethod] =
    useState<'envio'|'recoger'>('envio')
  const [paymentMethod, setPaymentMethod] =
    useState<'tarjeta'|'paypal'|'transferencia'>('tarjeta')
  const [selectedRate, setSelectedRate] = useState<Rate|null>(null)

  // Totales
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const tax      = subtotal * 0.16
  const shippingCost =
    shippingMethod === 'envio' && selectedRate
      ? selectedRate.price
      : 0
  const total = subtotal + tax + shippingCost

  // Callback al seleccionar tarifa
  const handleSelectRate = (rate: Rate) => {
    setSelectedRate(rate)
  }

  const handleCheckout = () => {
    console.log({
      contactEmail,
      subscribe,
      shippingInfo,
      shippingMethod,
      selectedRate,
      paymentMethod,
      items,
      total,
    })
    alert('Pedido procesado. Revisa la consola para más detalles.')
    // clearCart()
  }

  // Si el carrito está vacío…
  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Tu carrito está vacío
        </h1>
        <Link
          href="/shop"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Ir a la tienda
        </Link>
      </div>
    )
  }

  // Prepara cartForAPI
  const cartForAPI = items.map(i => ({
    weight_kg: (i as any).weight ?? 0.5,
    length_cm: 10,
    width_cm:  10,
    height_cm: 5,
  }))

  // Comprueba si la dirección está completa
  const addressComplete =
    !!shippingInfo.address1 &&
    !!shippingInfo.city &&
    !!shippingInfo.state &&
    !!shippingInfo.postcode

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-900">
        Checkout
      </h1>

      {/* Información de Contacto */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Información de Contacto</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={e => setSubscribe(e.target.checked)}
              className="h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Recibir ofertas y novedades</span>
          </div>
        </div>
      </section>

      {/* Detalles de Envío */}
      <section className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Detalles de Envío</h2>

        {/* Método de entrega */}
        <div className="flex gap-6">
          {(['envio','recoger'] as const).map(m => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shippingMethod"
                value={m}
                checked={shippingMethod === m}
                onChange={() => setShippingMethod(m)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span>
                {m === 'envio' ? 'Envío a domicilio' : 'Recoger en tienda'}
              </span>
            </label>
          ))}
        </div>

        {/* Campos de dirección */}
        {shippingMethod === 'envio' && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {(
                [
                  ['name','Nombre y Apellido','text'],
                  ['phone','Teléfono','text'],
                  ['address1','Dirección 1','text'],
                  ['address2','Dirección 2 (opcional)','text'],
                  ['city','Ciudad','text'],
                  ['state','Estado/Región','text'],
                  ['postcode','Código Postal','text'],
                  ['country','País','text'],
                ] as const
              ).map(([key,label,type]) => (
                <div
                  key={key}
                  className={
                    key === 'address1' || key === 'address2'
                      ? 'col-span-2'
                      : ''
                  }
                >
                  <label className="block font-medium mb-1">{label}</label>
                  <input
                    type={type}
                    value={(shippingInfo as any)[key]}
                    onChange={e =>
                      setShippingInfo({
                        ...shippingInfo,
                        [key]: e.target.value,
                      })
                    }
                    placeholder={label}
                    className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              ))}
            </div>

            {/* Componente de cotización EnvíaYa */}
            {addressComplete ? (
              <div>
                <h3 className="font-medium mb-2">Elige tu método de envío</h3>
                <ShippingOptions
                  shippingInfo={shippingInfo}
                  cart={cartForAPI}
                  onSelect={handleSelectRate}
                />
              </div>
            ) : (
              <p className="text-gray-600 mt-4">
                Completa calle, ciudad, estado y código postal para ver tarifas.
              </p>
            )}
          </>
        )}
      </section>

      {/* Resumen de Pedido */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Resumen de Tu Pedido</h2>
        <div className="space-y-4 mb-6">
          {items.map(i => (
            <div
              key={i.id}
              className="flex items-center space-x-4 border-b pb-2"
            >
              <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                <Image
                  src={i.image || '/placeholder.png'}
                  alt={i.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{i.name}</p>
                <p className="text-sm">Cantidad: {i.quantity}</p>
              </div>
              <p className="font-bold">
                ${(i.price * i.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>IVA (16%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>${shippingMethod === 'envio' ? shippingCost.toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Métodos de Pago */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Método de Pago</h2>
        {(['tarjeta','paypal','transferencia'] as const).map(m => (
          <label
            key={m}
            className="flex items-center gap-3 mb-4 cursor-pointer"
          >
            <input
              type="radio"
              name="paymentMethod"
              value={m}
              checked={paymentMethod === m}
              onChange={() => setPaymentMethod(m)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span>
              {m === 'tarjeta'
                ? 'Tarjeta de Crédito/Débito'
                : m === 'paypal'
                ? 'PayPal'
                : 'Transferencia Bancaria'}
            </span>
          </label>
        ))}
      </section>

      {/* Botón Final */}
      <div className="text-center">
        <button
          onClick={handleCheckout}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-bold hover:bg-blue-700"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  )
}
