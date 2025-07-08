/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// POST /api/payments
export async function POST(_request: Request) {
  try {
    // 1) Obtener monto del lado del servidor (ejemplo estático por ahora)
    const serverAmount = 17400; // en centavos (ej. 174.00 MXN)

    // 2) Crear PaymentIntent con idempotency key
    const idempotencyKey = crypto.randomUUID();
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: serverAmount,
        currency: 'mxn',
        automatic_payment_methods: { enabled: true },
      },
      { idempotencyKey }
    );

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Stripe Error:', message);
    return NextResponse.json(
      { error: message || 'Error creando el PaymentIntent' },
      { status: 500 }
    );
  }
}

// GET /api/payments - endpoint de prueba o status
export async function GET() {
  return NextResponse.json(
    { message: 'GET /api/payments no implementado' },
    { status: 200 }
  );
}
