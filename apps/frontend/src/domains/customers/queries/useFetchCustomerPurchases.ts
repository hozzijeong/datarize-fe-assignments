import { useSuspenseQuery } from '@tanstack/react-query'
import type { Purchase } from '../types'

async function fetchCustomerPurchases(customerId: string): Promise<Purchase[]> {
  const response = await fetch(`/api/customers/${customerId}/purchases`)

  if (!response.ok) {
    throw new Error('Failed to fetch customer purchases')
  }

  return response.json()
}

export function useFetchCustomerPurchases(customerId: string) {
  return useSuspenseQuery({
    queryKey: ['customerPurchases', customerId],
    queryFn: () => fetchCustomerPurchases(customerId),
  })
}
