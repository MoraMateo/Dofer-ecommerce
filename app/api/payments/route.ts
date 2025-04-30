// File: app/api/payments/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export async function POST(request: Request) {
  try {
    const { amount } = await request.json()
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
