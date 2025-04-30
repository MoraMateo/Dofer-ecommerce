'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js'
import type { StripeError, PaymentIntent } from '@stripe/stripe-js'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}
export interface ShippingInfo {
  name:     string
  phone:    string
  address1: string
  address2: string
  city:     string
  state:    string
  postcode: string
  country:  string
}

interface Props {
  amount:         number
  contactEmail:   string
  shippingInfo:   ShippingInfo
  items:          OrderItem[]
  onOrderCreated: () => void
}

export default function PaymentForm({
  amount,
  contactEmail,
  shippingInfo,
  items,
  onOrderCreated,
}: Props) {
  const stripe   = useStripe()
  const elements = useElements()
  const router   = useRouter()

  const [clientSecret, setClientSecret] = useState<string|null>(null)
  const [error,        setError]        = useState<string|null>(null)
  const [loading,      setLoading]      = useState(false)

  // 1) Creamos el PaymentIntent
  useEffect(() => {
    fetch('/api/payments', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ amount }),
    })
      .then(r=>r.json())
      .then(d=>{
        if (d.clientSecret) setClientSecret(d.clientSecret)
        else if (d.error)   setError(d.error)
      })
      .catch(e=>setError(e.message))
  }, [amount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setLoading(true)
    setError(null)

    const cardEl = elements.getElement(CardElement)
    if (!cardEl) {
      setError('No se pudo leer los datos de la tarjeta')
      setLoading(false)
      return
    }

    // 2) Confirmamos el pago
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardEl,
        billing_details: {
          email: contactEmail,
          name:  shippingInfo.name,
          phone: shippingInfo.phone,
          address: { postal_code: shippingInfo.postcode },
        },
      },
    })

    // 3) Si Stripe devuelve error:
    if (result.error) {
      const se = result.error as StripeError
      setError(se.message || 'Error procesando el pago')
      setLoading(false)
      return
    }

    // 4) Pago ok → creamos la orden en WooCommerce
    const pi = result.paymentIntent as PaymentIntent
    if (pi.status === 'succeeded') {
      const wcPayload = {
        payment_method:       'stripe',
        payment_method_title: 'Stripe',
        set_paid:             true,
        billing: {
          first_name: shippingInfo.name,
          last_name:  '',
          address_1:  shippingInfo.address1,
          address_2:  shippingInfo.address2,
          city:       shippingInfo.city,
          state:      shippingInfo.state,
          postcode:   shippingInfo.postcode,
          country:    shippingInfo.country,
          email:      contactEmail,
          phone:      shippingInfo.phone,
        },
        shipping: {
          first_name: shippingInfo.name,
          last_name:  '',
          address_1:  shippingInfo.address1,
          address_2:  shippingInfo.address2,
          city:       shippingInfo.city,
          state:      shippingInfo.state,
          postcode:   shippingInfo.postcode,
          country:    shippingInfo.country,
        },
        line_items: items.map(i=>({
          product_id: Number(i.id),
          quantity:   i.quantity,
        })),
      }

      console.log('🔔 Enviando a WooCommerce:', JSON.stringify(wcPayload, null,2))
      const resp = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(wcPayload),
      })
      const json = await resp.json()
      if (!resp.ok) {
        setError(json.error||'Error creando la orden')
        setLoading(false)
        return
      }

      onOrderCreated()
      router.push(`/order/success?orderId=${json.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="font-medium">Datos de tarjeta</span>
        <div className="mt-1 p-4 border rounded">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </label>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!stripe||!clientSecret||loading}
        className="w-full py-3 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Procesando…' : `Pagar $${(amount/100).toFixed(2)}`}
      </button>
    </form>
  )
}
