import { useSuspenseQuery } from '@tanstack/react-query'
import type { PurchaseFrequency, PurchaseFrequencyParams } from '../types'
import { PurchaseFrequencyError } from '../errors/PurchaseFrequencyError'

function buildUrl(params?: PurchaseFrequencyParams): string {
  if (!params?.from || !params?.to) return '/api/purchase-frequency'

  const searchParams = new URLSearchParams()
  searchParams.set('from', params.from)
  searchParams.set('to', params.to)

  return `/api/purchase-frequency?${searchParams.toString()}`
}

export async function fetchPurchaseFrequency(params?: PurchaseFrequencyParams): Promise<PurchaseFrequency[]> {
  const response = await fetch(buildUrl(params))

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new PurchaseFrequencyError('Failed to fetch purchase frequency', response.status, data.error)
  }

  return response.json()
}

export function useFetchPurchaseFrequency(params?: PurchaseFrequencyParams) {
  return useSuspenseQuery({
    queryKey: ['purchaseFrequency', params],
    queryFn: () => fetchPurchaseFrequency(params),
  })
}
