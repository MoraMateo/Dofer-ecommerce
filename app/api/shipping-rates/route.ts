// File: /app/api/shipping-rates/route.ts

import { NextRequest, NextResponse } from 'next/server'

const ENV = process.env
const isProd = ENV.NODE_ENV === 'production'
const BASE = isProd
  ? 'https://enviaya.com.mx/api/v1'
  : 'https://sandbox.enviaya.com.mx/api/v1'

export async function GET(req: NextRequest) {
  const qp       = new URL(req.url).searchParams
  const fullname = qp.get('name')      || ''
  const phone    = qp.get('phone')     || ''
  const address1 = qp.get('address1')  || ''
  const address2 = qp.get('address2')  || ''
  const city     = qp.get('city')      || ''
  const state    = qp.get('state')     || ''
  const postcode = qp.get('postcode')  || ''
  const country  = qp.get('country')   || 'MX'
  const cart     = JSON.parse(qp.get('cart') || '[]')

  const account = ENV.ENVIAYA_ACCOUNT!
  const apiKey  = ENV.ENVIAYA_API_KEY!

  // Cotizar solo con Estafeta, Paquetexpress, FedEx y UPS
  const qs = new URLSearchParams({ api_key: apiKey });
  ;['Estafeta','Paquetexpress','FedEx','UPS']
    .forEach(c => qs.append('carriers[]', c))

  // Payload para EnvíaYa
  const payload = {
    enviaya_account: account,
    origin_direction: {
      full_name:    ENV.FROM_NAME    || '',
      phone:        ENV.FROM_PHONE   || '',
      direction_1:  ENV.FROM_STREET1 || '',
      city:         ENV.FROM_CITY    || '',
      state_code:   ENV.FROM_STATE   || '',
      postal_code:  ENV.FROM_ZIP     || '',
      country_code: ENV.FROM_COUNTRY || 'MX',
    },
    destination_direction: {
      full_name:    fullname,
      phone:        phone,
      direction_1:  address1,
      direction_2:  address2,
      city,
      state_code:   state,
      postal_code:  postcode,
      country_code: country,
    },
    shipment: {
      shipment_type: 'Package',
      parcels: [
        {
          quantity:    1,
          weight:      Math.max(0.5, cart.reduce((s: number, i: any) => s + (i.weight_kg||0), 0)),
          weight_unit: 'kg',
          length:      10,
          width:       10,
          height:      5,
          dimension_unit: 'cm',
          content:     'Pedido DOFER',
        }
      ]
    }
  }

  // Llamada a EnvíaYa con caching en edge
  const apiRes = await fetch(
    `${BASE}/rates?${qs.toString()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      next: { revalidate: 300 }    // cache 5 minutos
    }
  )

  if (!apiRes.ok) {
    console.error('[EnvíaYa rates error]', await apiRes.text())
    return NextResponse.json({ error: 'rate-error' }, { status: 502 })
  }

  const data = await apiRes.json()

  // Combina únicamente los carriers que solicitamos
  const allOptions = [
    ...(data.Estafeta      || []),
    ...(data.Paquetexpress || []),
    ...(data.FedEx         || []),
    ...(data.UPS           || []),
  ]

  // Normaliza, ordena por precio y toma las 4 más baratas
  const formatted = allOptions
    .map((r: any) => ({
      id:    `${r.carrier}_${r.carrier_service_code}`,
      name:  `${r.carrier} ${r.carrier_service_name}`,
      price: r.total_amount,
      eta:   r.estimated_delivery || '',
      code:  r.carrier_service_code,
    }))
    .sort((a, b) => a.price - b.price)
    .slice(0, 4)

  // Responde y cachea 5 minutos
  return NextResponse.json(formatted, {
    headers: { 'Cache-Control': 'public, max-age=300' }
  })
}
