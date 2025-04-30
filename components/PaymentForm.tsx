// File: components/PaymentForm.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js'

interface Props {
  amount: number           // en centavos
  contactEmail: string     // correo del cliente
  shippingInfo: {
    name: string
    phone: string
    postcode: string
  }
}

export default function PaymentForm({
  amount,
  contactEmail,
  shippingInfo
}: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Crea el PaymentIntent en tu servidor
    fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else if (data.error) {
          setError(data.error)
        }
      })
      .catch(err => setError(err.message))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setLoading(true)
    setError(null)

    // Obtiene el CardElement
    const cardElement = elements.getElement(CardElement)

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            email: contactEmail,
            name: shippingInfo.name,
            phone: shippingInfo.phone,
            address: {
              postal_code: shippingInfo.postcode,
            },
          },
        },
      })

    setLoading(false)

    if (stripeError) {
      setError(stripeError.message || 'Error procesando el pago')
    } else if (paymentIntent?.status === 'succeeded') {
      alert('¡Pago exitoso!')
      // TODO: limpiar carrito y redirigir al usuario
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="font-medium">Datos de tarjeta</span>
        <div className="mt-1 p-4 border rounded">
          <CardElement
            options={{
              hidePostalCode: true,
            }}
          />
        </div>
      </label>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded disabled:opacity-50 transition"
      >
        {loading ? 'Procesando…' : `Pagar $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  )
}
