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
    name:'', phone:'',
    address1:'', address2:'',
    city:'', state:'',
    postcode:'', country:'MX',
  })
  const [shippingMethod, setShippingMethod] =
    useState<'envio'|'recoger'>('envio')
  const [paymentMethod, setPaymentMethod] =
    useState<'tarjeta'|'paypal'|'transferencia'>('tarjeta')
  const [selectedRate, setSelectedRate] = useState<Rate|null>(null)
  const [error, setError] = useState<string|null>(null)

  // Totales
  const subtotal     = items.reduce((s,i)=>s+i.price*i.quantity,0)
  const tax          = subtotal * 0.16
  const shippingCost = shippingMethod==='envio' && selectedRate
    ? selectedRate.price : 0
  const total = subtotal + tax + shippingCost

  const handleSelectRate = useCallback((r:Rate)=>setSelectedRate(r),[])

  useEffect(()=>setError(null),[paymentMethod])

  const handleCheckout = () => {
    if (shippingMethod==='envio' && !selectedRate) {
      alert('Selecciona tarifa de envío')
      return
    }
    if (paymentMethod!=='tarjeta') {
      alert(`Procesando via ${paymentMethod}`)
      clearCart()
    }
    // Tarjeta la procesa PaymentForm
  }

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-extrabold mb-6">Carrito vacío</h1>
        <Link href="/shop" className="px-6 py-3 bg-blue-600 text-white rounded">
          Ir a la tienda
        </Link>
      </div>
    )
  }

  const cartForAPI = items.map(i=>({
    weight_kg:(i as any).weight||0.5,
    length_cm:10,width_cm:10,height_cm:5,
  }))
  const addressComplete = ['name','phone','address1','city','state','postcode']
    .every(k=>!!(shippingInfo as any)[k])

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contacto */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1">Correo</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e=>setContactEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={e=>setSubscribe(e.target.checked)}
                  className="h-5 w-5 text-blue-600"
                /><span className="ml-2">Recibir novedades</span>
              </div>
            </div>
          </section>

          {/* Envío */}
          <section className="bg-white p-6 rounded shadow space-y-6">
            <h2 className="text-2xl font-semibold">Envío</h2>
            <div className="flex gap-6">
              {(['envio','recoger'] as const).map(m=>(
                <label key={m} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod===m}
                    onChange={()=>setShippingMethod(m)}
                    className="form-radio"
                  />
                  <span>{m==='envio'?'Domicilio':'Recoger'}</span>
                </label>
              ))}
            </div>
            {shippingMethod==='envio' && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {(
                    [
                      ['name','Nombre','text'],
                      ['phone','Teléfono','text'],
                      ['address1','Dirección','text'],
                      ['address2','Dir. 2','text'],
                      ['city','Ciudad','text'],
                      ['state','Estado','text'],
                      ['postcode','CP','text'],
                      ['country','País','text'],
                    ] as const
                  ).map(([k,l,t])=>(
                    <div key={k} className={k==='address1'||k==='address2'?'col-span-2':''}>
                      <label className="block mb-1">{l}</label>
                      <input
                        type={t}
                        value={(shippingInfo as any)[k]}
                        onChange={e=>setShippingInfo({...shippingInfo,[k]:e.target.value})}
                        className="w-full border px-3 py-2 rounded"
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
                    : <p className="text-gray-600">Completa datos para tarifas</p>
                  }
                </div>
              </>
            )}
          </section>

          {/* Pago */}
          <section className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-semibold">Pago</h2>
            <div className="flex gap-6 mb-6">
              {(['tarjeta','paypal','transferencia'] as const).map(m=>(
                <label key={m} className="flex items-center gap-2 px-4 py-2 rounded border cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod===m}
                    onChange={()=>setPaymentMethod(m)}
                    className="form-radio"
                  />
                  <span className="font-medium">
                    {m==='tarjeta'?'Tarjeta':m==='paypal'?'PayPal':'Transferencia'}
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod==='tarjeta' && (
              <Elements stripe={stripePromise}>
                <PaymentForm amount={Math.round(total*100)} />
              </Elements>
            )}

            {paymentMethod==='paypal' && (
              <button
                onClick={()=>alert('Integrar PayPal SDK')}
                className="w-full py-3 bg-yellow-500 text-white rounded"
              >Pagar con PayPal</button>
            )}

            {paymentMethod==='transferencia' && (
              <div className="text-gray-700">
                <p>Transferencia a:</p>
                <ul className="list-disc list-inside">
                  <li>Banco Ejemplo</li>
                  <li>Cuenta 1234567890</li>
                  <li>CLABE 012345678901234567</li>
                </ul>
                <p className="mt-2 text-sm">Envía comprobante a pagos@dofer.com</p>
              </div>
            )}
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <section className="bg-white p-6 rounded shadow sticky top-20">
            <h2 className="text-2xl font-semibold mb-4">Tu Pedido</h2>
            <div className="space-y-4 mb-4">
              {items.map(i=>(
                <div key={i.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative">
                    <Image
                      src={i.image||'/placeholder.png'}
                      alt={i.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-500">x{i.quantity}</p>
                  </div>
                  <p className="font-semibold">${(i.price*i.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>IVA (16%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Envío</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            {/* Botón genérico solo para PayPal/Transferencia */}
            {paymentMethod!=='tarjeta' && (
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-blue-600 text-white rounded"
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
