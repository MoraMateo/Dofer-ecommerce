import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'
// import { getSession } from '@/lib/auth'         // tu función de sesión
// import { getCartForUser, calculateTotal } from '@/lib/cart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export async function POST(request: Request) {
  try {
    // 1) Validar sesión / usuario autenticado
    // const session = await getSession(request.headers.get('cookie'))
    // if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    // 2) Obtener carrito y monto DEL LADO DEL SERVIDOR
    // const cart = await getCartForUser(session.user.id)
    // const serverAmount = calculateTotal(cart) * 100  // en centavos

    // (Si por ahora quieres usar siempre el mismo amount de prueba:)
    const serverAmount = 17400

    // 3) Crear PaymentIntent con idempotency key
    const idempotencyKey = crypto.randomUUID()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: serverAmount,
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
    }, {
      idempotencyKey
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })

  } catch (err: any) {
    console.error('Stripe Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
