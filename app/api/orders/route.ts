// File: app/api/orders/route.ts
import { NextResponse } from 'next/server'
import { createOrder } from '@/services/wooCommerce'

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // Aquí ya viene en la forma que StripeForm envía:
    // {
    //   payment_method, payment_method_title, set_paid,
    //   billing, shipping, line_items, (opcional) shipping_lines
    // }

    const data = await createOrder(payload)

    if (!data) {
      return NextResponse.json(
        { error: 'No se pudo crear la orden' },
        { status: 400 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error('Error en POST /api/orders:', err)
    return NextResponse.json(
      { error: err.message || 'Error creando la orden' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'GET /api/orders no implementado' },
    { status: 200 }
  )
}
