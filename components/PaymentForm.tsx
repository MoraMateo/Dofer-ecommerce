// File: components/PaymentForm.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js'

interface Props {
  amount: number  // en centavos
}

export default function PaymentForm({ amount }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then(r => r.json())
      .then(d => setClientSecret(d.clientSecret))
      .catch(e => setError(e.message))
  }, [amount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setLoading(true)
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! }
      })
    setLoading(false)

    if (stripeError) {
      setError(stripeError.message || 'Error procesando el pago')
    } else if (paymentIntent?.status === 'succeeded') {
      alert('¡Pago exitoso!')
      // Aquí puedes redirigir o limpiar carrito
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="w-full py-3 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Procesando…' : `Pagar $${(amount/100).toFixed(2)}`}
      </button>
    </form>
  )
}
