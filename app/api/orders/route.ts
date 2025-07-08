import { NextResponse } from 'next/server'
import { createOrder } from '@/services/wooCommerce'

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // payload con campos: payment_method, billing, shipping, line_items, etc.
    const data = await createOrder(payload)

    if (!data) {
      return NextResponse.json(
        { error: 'No se pudo crear la orden' },
        { status: 400 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Error en POST /api/orders:', message)
    return NextResponse.json(
      { error: message || 'Error creando la orden' },
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
