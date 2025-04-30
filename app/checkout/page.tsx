// File: app/checkout/page.tsx
'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store/cartStore'
import ShippingOptions, { Rate } from '@/components/ShippingOptions'
import PaymentForm, { OrderItem, ShippingInfo } from '@/components/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// helper para validar e-mail
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const [contactEmail,    setContactEmail]    = useState('')
  const [subscribe,       setSubscribe]       = useState(true)
  const [shipInfo,        setShipInfo]        = useState<ShippingInfo>({
    name: '', phone: '', address1: '', address2: '',
    city: '', state: '', postcode: '', country: 'MX',
  })
  const [shippingMethod,  setShippingMethod]  = useState<'envio'|'recoger'>('envio')
  const [paymentMethod,   setPaymentMethod]   = useState<'tarjeta'|'paypal'|'transferencia'>('tarjeta')
  const [selectedRate,    setSelectedRate]    = useState<Rate|null>(null)

  // 1) Totales
  const subtotal     = items.reduce((s,i)=>s + i.price * i.quantity, 0)
  const tax          = subtotal * 0.16
  const shippingCost = shippingMethod === 'envio' && selectedRate
    ? selectedRate.price
    : 0
  const total        = subtotal + tax + shippingCost

  const handleSelectRate = useCallback((r: Rate) => {
    setSelectedRate(r)
  }, [])

  // 2) Mapeo para PaymentForm
  const orderItems: OrderItem[] = items.map(i => ({
    id:       i.id,
    name:     i.name,
    price:    i.price,
    quantity: i.quantity,
  }))

  // 3) Payload para ShippingOptions
  const cartForAPI = items.map(i => ({
    weight_kg: (i as any).weight || 0.5,
    length_cm: 10,
    width_cm:  10,
    height_cm: 5,
  }))

  const addressComplete =
    ['name','phone','address1','city','state','postcode']
    .every(k => !!(shipInfo as any)[k])

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
          Tu carrito está vacío
        </h1>
        <Link href="/shop" className="px-6 py-3 bg-indigo-600 text-white rounded-md">
          Ir a la tienda
        </Link>
      </div>
    )
  }

  const inputClass = `
    block w-full border rounded-md px-3 py-2
    focus:ring-2 focus:ring-indigo-500 sm:text-sm
  `

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* MAIN FORM */}
        <main className="flex-1 space-y-8">
          {/* Contacto */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Correo</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className={inputClass}
                  placeholder="tú@correo.com"
                />
                {contactEmail && !isValidEmail(contactEmail) && (
                  <p className="text-red-500 text-sm mt-1">
                    Ingresa un correo válido
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={e => setSubscribe(e.target.checked)}
                  className="h-5 w-5 text-indigo-600"
                />
                <label className="ml-2">Recibir novedades</label>
              </div>
            </div>
          </section>

          {/* Envío */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Envío</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {(['envio','recoger'] as const).map(m => (
                <label key={m} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === m}
                    onChange={() => setShippingMethod(m)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="font-medium">
                    {m === 'envio' ? 'Domicilio' : 'Recoger'}
                  </span>
                </label>
              ))}
            </div>
            {shippingMethod === 'envio' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {(
                    [
                      ['name','Nombre'],
                      ['phone','Teléfono'],
                      ['address1','Dirección'],
                      ['address2','Dir. 2'],
                      ['city','Ciudad'],
                      ['state','Estado'],
                      ['postcode','CP'],
                      ['country','País'],
                    ] as const
                  ).map(([k,label]) => (
                    <div key={k} className={(k==='address1'||k==='address2') ? 'md:col-span-2' : ''}>
                      <label className="block mb-1">{label}</label>
                      <input
                        type="text"
                        value={(shipInfo as any)[k]}
                        onChange={e => setShipInfo({
                          ...shipInfo,
                          [k]: e.target.value
                        })}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium mb-2">Método de envío</h3>
                  {addressComplete ? (
                    <ShippingOptions
                      shippingInfo={shipInfo}
                      cart={cartForAPI}
                      onSelect={handleSelectRate}
                    />
                  ) : (
                    <p className="text-gray-600">
                      Completa los datos para ver tarifas
                    </p>
                  )}
                </div>
              </>
            )}
          </section>

          {/* Pago */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Pago</h2>
            <div className="flex gap-4 mb-6">
              {(['tarjeta','paypal','transferencia'] as const).map(m => (
                <label
                  key={m}
                  className={`px-4 py-2 border rounded cursor-pointer ${
                    paymentMethod===m
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod===m}
                    onChange={() => setPaymentMethod(m)}
                    className="form-radio"
                  />
                  <span className="ml-2">
                    {m==='tarjeta'?'Tarjeta':m==='paypal'?'PayPal':'Transferencia'}
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod==='tarjeta' && isValidEmail(contactEmail) && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={Math.round(total*100)}
                  contactEmail={contactEmail}
                  shippingInfo={shipInfo}
                  items={orderItems}
                  onOrderCreated={() => clearCart()}
                />
              </Elements>
            )}

            {paymentMethod==='paypal' && (
              <button className="w-full py-3 bg-yellow-500 text-white rounded">
                Pagar con PayPal
              </button>
            )}

            {paymentMethod==='transferencia' && (
              <div className="text-gray-700">
                <p>Transferencia a:</p>
                <ul className="list-disc list-inside ml-5">
                  <li>Banco Ejemplo</li>
                  <li>Cuenta 1234567890</li>
                  <li>CLABE 012345678901234567</li>
                </ul>
                <p className="mt-2 text-sm">
                  Envía comprobante a pagos@dofer.com
                </p>
              </div>
            )}
          </section>
        </main>

        {/* SIDEBAR DE RESUMEN */}
        <aside className="mt-8 lg:mt-0 lg:w-80">
          <section className="bg-white p-6 rounded-lg shadow sticky top-20">
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
                  <p className="font-semibold">
                    ${(i.price * i.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (16%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span><span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            {paymentMethod!=='tarjeta' && (
              <button
                onClick={()=>{
                  if (shippingMethod==='envio' && !selectedRate) {
                    alert('Selecciona tarifa de envío')
                    return
                  }
                  alert(`Procesando via ${paymentMethod}`)
                  clearCart()
                }}
                className="w-full mt-4 py-3 bg-indigo-600 text-white rounded"
              >
                {paymentMethod==='paypal'?'Pagar con PayPal':'Finalizar Pedido'}
              </button>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}
