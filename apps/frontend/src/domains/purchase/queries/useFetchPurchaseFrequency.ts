import { useSuspenseQuery } from '@tanstack/react-query'
import type { PurchaseFrequency, PurchaseFrequencyParams } from '../types'

function buildUrl(params?: PurchaseFrequencyParams): string {
  if (!params) return '/api/purchase-frequency'

  return `/api/purchase-frequency?from=${params.from}&to=${params.to}`
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
