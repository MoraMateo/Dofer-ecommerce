'use client'
import { useEffect, useState } from 'react'

export interface Rate {
  id: string
  name: string
  price: number
  estimatedDays: number
}

interface Props {
  shippingInfo: {
    address1: string
    address2?: string
    city:     string
    state:    string
    postcode: string
    country:  string
  }
  cart: {
    weight_kg: number
    length_cm?: number
    width_cm?:  number
    height_cm?: number
  }[]
  onSelect: (rate: Rate) => void
}

export default function ShippingOptions({
  shippingInfo,
  cart,
  onSelect,
}: Props) {
  const [rates, setRates] = useState<Rate[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Desestructura shippingInfo
  const {
    address1,
    address2 = '',
    city,
    state,
    postcode,
    country
  } = shippingInfo

  useEffect(() => {
    // Sólo cotizar si hay datos suficientes
    if (!address1 || !city || !state || !postcode) return

    const loadRates = async () => {
      setLoading(true)
      setError(null)

      try {
        // Monta la URL con query params
        const params = new URLSearchParams({
          address1,
          address2,
          city,
          state,
          postcode,
          country,
          cart: JSON.stringify(cart),
        })
        const res = await fetch(`/api/shipping-rates?${params.toString()}`)
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || `Status ${res.status}`)
        }
        const data: Rate[] = await res.json()
        setRates(data)
        if (data.length) {
          setSelectedId(data[0].id)
          onSelect(data[0])
        }
      } catch (err: any) {
        console.error('Error cargando tarifas:', err)
        setError('No se pudieron cargar las tarifas de envío.')
      } finally {
        setLoading(false)
      }
    }

    loadRates()
  }, [
    address1,
    address2,
    city,
    state,
    postcode,
    country,
    cart,
    onSelect,
  ])

  if (!address1 || !city || !state || !postcode) {
    return (
      <p className="text-gray-600">
        Completa tu dirección para ver tarifas.
      </p>
    )
  }

  if (loading) {
    return (
      <p className="text-gray-600">
        Cargando métodos de envío…
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    )
  }

  if (!rates.length) {
    return (
      <p className="text-gray-600">
        No hay opciones de envío disponibles.
      </p>
    )
  }

  return (
    <div className="grid gap-4">
      {rates.map((rate) => (
        <label
          key={rate.id}
          className={`
            flex justify-between items-center p-4 border rounded-lg cursor-pointer
            ${selectedId === rate.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
            }
          `}
        >
          <input
            type="radio"
            name="shippingRate"
            className="sr-only"
            value={rate.id}
            checked={selectedId === rate.id}
            onChange={() => {
              setSelectedId(rate.id)
              onSelect(rate)
            }}
          />
          <div>
            <p className="font-medium">{rate.name}</p>
            <p className="text-sm text-gray-500">
              {rate.estimatedDays} días hábiles
            </p>
          </div>
          <p className="font-semibold">
            ${rate.price.toFixed(2)}
          </p>
        </label>
      ))}
    </div>
  )
}
