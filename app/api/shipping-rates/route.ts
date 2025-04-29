// /app/api/shipping-rates/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url        = new URL(request.url)
  const destPostal = url.searchParams.get('postcode')  || ''
  const cart       = JSON.parse(url.searchParams.get('cart') || '[]') as Array<{
    weight_kg: number
  }>

  // 1) Suma peso total (kg), con 0.5kg mínimo
  const totalKg = cart.reduce((sum, item) => sum + (item.weight_kg || 0), 0) || 0.5

  // 2) Elige el endpoint sandbox o producción
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://enviaya.com.mx/api/v1'
    : 'https://ship-test.enviaya.com.mx/api/v1'

  // 3) Monta el body exactamente como EnviaYa lo espera
  const body = {
    parcels: [
      {
        quantity:       1,
        weight:         totalKg,
        weight_unit:    'kg',
        length:         10,
        width:          10,
        height:         5,
        dimension_unit: 'cm',
      }
    ],
    origin_direction: {
      direction_1:  process.env.FROM_STREET1   || '',
      city:         process.env.FROM_CITY      || '',
      state_code:   process.env.FROM_STATE     || '',
      postal_code:  process.env.FROM_ZIP       || '',
      country_code: process.env.FROM_COUNTRY   || 'MX',
    },
    destination_direction: {
      direction_1:  url.searchParams.get('address1') || '',
      direction_2:  url.searchParams.get('address2') || '',
      city:         url.searchParams.get('city')     || '',
      state_code:   url.searchParams.get('state')    || '',
      postal_code:  destPostal,
      country_code: url.searchParams.get('country')  || 'MX',
    },
  }

  // 4) Llamada a EnviaYa
  const res = await fetch(`${baseUrl}/rates`, {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${(process.env.ENVIAYA_API_KEY||'').trim()}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  // 5) Parseo de la respuesta
  const { rates } = await res.json() as {
    rates: Array<{
      carrier:              string
      carrier_service_name: string
      total_amount:         number
      estimated_delivery:   string
    }>
  }

  // 6) Formatea al shape que tu UI espera
  const formatted = rates.map(r => ({
    id:            `${r.carrier}_${r.carrier_service_name}`
                    .replace(/\s+/g,'_')
                    .toLowerCase(),
    name:          `${r.carrier} ${r.carrier_service_name}`,
    price:         r.total_amount,
    estimatedDays: Number(r.estimated_delivery.match(/\d+/)?.[0] ?? 0),
  }))

  return NextResponse.json(formatted)
}
