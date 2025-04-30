// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'https://tu-dominio.com.mx'
  : 'http://localhost:3000'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Stripe-Signature'
  )
  // Si es preflight, responder 204
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: response.headers,
    })
  }
  return response
}

// Solo aplica a tus rutas de API
export const config = {
  matcher: '/api/:path*',
}
