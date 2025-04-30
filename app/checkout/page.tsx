// File: app/checkout/page.tsx
'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store/cartStore'
import ShippingOptions, { Rate } from '@/components/ShippingOptions'
import PaymentForm from '@/components/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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
    useState<'envio' | 'recoger'>('envio')
  const [paymentMethod, setPaymentMethod] =
    useState<'tarjeta' | 'paypal' | 'transferencia'>('tarjeta')
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null)

  // Totales
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = subtotal * 0.16
  const shippingCost = shippingMethod === 'envio' && selectedRate
    ? selectedRate.price : 0
  const total = subtotal + tax + shippingCost

  const handleSelectRate = useCallback((r: Rate) => setSelectedRate(r), [])

  useEffect(() => { }, [paymentMethod])

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Tu carrito está vacío</h1>
        <Link href="/shop" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition">
          Ir a la tienda
        </Link>
      </div>
    )
  }

  const inputClass = `
    block w-full border border-gray-300 rounded-md shadow-sm
    px-3 py-2 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
    sm:text-sm
  `

  const cartForAPI = items.map(i => ({
    weight_kg: (i as any).weight || 0.5,
    length_cm: 10, width_cm: 10, height_cm: 5,
  }))
  const addressComplete = ['name', 'phone', 'address1', 'city', 'state', 'postcode']
    .every(k => !!(shippingInfo as any)[k])

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">Checkout</h1>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* MAIN FORM */}
        <main className="flex-1 space-y-8">
          {/* Contacto */}
          <section className="bg-white p-6 sm:p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Correo</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className={inputClass}
                  placeholder="tú@correo.com"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={e => setSubscribe(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 font-medium">Recibir novedades</label>
              </div>
            </div>
          </section>

          {/* Envío */}
          <section className="bg-white p-6 sm:p-8 rounded-lg shadow space-y-6">
            <h2 className="text-2xl font-semibold">Envío</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {(['envio', 'recoger'] as const).map(m => (
                <label key={m} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === m}
                    onChange={() => setShippingMethod(m)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="font-medium">{m === 'envio' ? 'Domicilio' : 'Recoger'}</span>
                </label>
              ))}
            </div>

            {shippingMethod === 'envio' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(
                    [
                      ['name', 'Nombre'],
                      ['phone', 'Teléfono'],
                      ['address1', 'Dirección'],
                      ['address2', 'Dir. 2'],
                      ['city', 'Ciudad'],
                      ['state', 'Estado'],
                      ['postcode', 'CP'],
                      ['country', 'País'],
                    ] as const
                  ).map(([k, label]) => (
                    <div
                      key={k}
                      className={(k === 'address1' || k === 'address2')
                        ? 'md:col-span-2' : ''}
                    >
                      <label className="block mb-1 font-medium">{label}</label>
                      <input
                        type="text"
                        value={(shippingInfo as any)[k]}
                        onChange={e => setShippingInfo({
                          ...shippingInfo,
                          [k]: e.target.value
                        })}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="mb-2 font-medium">Método de envío</h3>
                  {addressComplete
                    ? <ShippingOptions
                      shippingInfo={shippingInfo}
                      cart={cartForAPI}
                      onSelect={handleSelectRate}
                    />
                    : <p className="text-gray-600">Completa los datos para ver tarifas</p>
                  }
                </div>
              </>
            )}
          </section>

          {/* Pago */}
          <section className="bg-white p-6 sm:p-8 rounded-lg shadow space-y-4">
            <h2 className="text-2xl font-semibold">Pago</h2>
            <div className="flex flex-wrap gap-4">
              {(['tarjeta', 'paypal', 'transferencia'] as const).map(m => (
                <label
                  key={m}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md border 
                    cursor-pointer transition
                    ${paymentMethod === m
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === m}
                    onChange={() => setPaymentMethod(m)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="font-medium">
                    {m === 'tarjeta' ? 'Tarjeta'
                      : m === 'paypal' ? 'PayPal'
                        : 'Transferencia'}
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod === 'tarjeta' && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={Math.round(total * 100)}
                  contactEmail={contactEmail}
                  shippingInfo={{
                    name: shippingInfo.name,
                    phone: shippingInfo.phone,
                    postcode: shippingInfo.postcode,
                  }}
                />
              </Elements>
            )}

            {paymentMethod === 'paypal' && (
              <button
                onClick={() => alert('Integrar PayPal SDK')}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
              >
                Pagar con PayPal
              </button>
            )}

            {paymentMethod === 'transferencia' && (
              <div className="text-gray-700">
                <p>Transferencia a:</p>
                <ul className="list-disc list-inside ml-5">
                  <li>Banco Ejemplo</li>
                  <li>Cuenta 1234567890</li>
                  <li>CLABE 012345678901234567</li>
                </ul>
                <p className="mt-2 text-sm">Envía comprobante a pagos@dofer.com</p>
              </div>
            )}
          </section>
        </main>

        {/* SIDEBAR DE RESUMEN */}
        <aside className="mt-8 lg:mt-0 lg:w-80">
          <section className="bg-white p-6 sm:p-8 rounded-lg shadow sticky top-20">
            <h2 className="text-2xl font-semibold mb-4">Tu Pedido</h2>
            <div className="space-y-4 mb-4">
              {items.map(i => (
                <div key={i.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative">
                    <Image
                      src={i.image || '/placeholder.png'}
                      alt={i.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-500">x{i.quantity}</p>
                  </div>
                  <p className="font-semibold">${(i.price * i.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>IVA (16%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Envío</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            {paymentMethod !== 'tarjeta' && (
              <button
                onClick={() => {
                  if (shippingMethod === 'envio' && !selectedRate) {
                    alert('Selecciona tarifa de envío')
                    return
                  }
                  alert(`Procesando via ${paymentMethod}`)
                  clearCart()
                }}
                className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
              >
                {paymentMethod === 'paypal' ? 'Pagar con PayPal' : 'Finalizar Pedido'}
              </button>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}
