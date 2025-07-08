import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const config = {
  api: { bodyParser: false }, // Stripe requiere raw body
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('⚠️ Webhook signature mismatch.', message);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  // Maneja sólo los eventos que te interesan
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent;
    // TODO: marca el pedido como pagado en tu DB:
    // await fulfillOrder(pi.id)
    console.log(`🎉 Pago exitoso para PaymentIntent ${pi.id}`);
  }

  return new NextResponse('OK');
}