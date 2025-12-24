import { useSuspenseQuery } from '@tanstack/react-query'
import type { PurchaseFrequency, PurchaseFrequencyParams } from '../types'

function buildUrl(params?: PurchaseFrequencyParams): string {
  if (!params?.from || !params?.to) return '/api/purchase-frequency'

  const searchParams = new URLSearchParams()
  searchParams.set('from', params.from)
  searchParams.set('to', params.to)

  return `/api/purchase-frequency?${searchParams.toString()}`
}

async function fetchPurchaseFrequency(params?: PurchaseFrequencyParams): Promise<PurchaseFrequency[]> {
  const response = await fetch(buildUrl(params))

  if (!response.ok) {
    throw new Error('Failed to fetch purchase frequency')
  }

  return response.json()
}

export function useFetchPurchaseFrequency(params?: PurchaseFrequencyParams) {
  return useSuspenseQuery({
    queryKey: ['purchaseFrequency', params],
    queryFn: () => fetchPurchaseFrequency(params),
  })
}
