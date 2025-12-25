import { useSuspenseQuery } from '@tanstack/react-query'
import type { Purchase } from '../types'
import { OrderListError } from '../errors/OrderListError'

async function fetchCustomerPurchases(customerId: string): Promise<Purchase[]> {
  const response = await fetch(`/api/customers/${customerId}/purchases`)

  if (!response.ok) {
    throw new OrderListError('Failed to fetch customer purchases', response.status)
  }

  return response.json()
}

export function useFetchCustomerPurchases(customerId: string) {
  return useSuspenseQuery({
    queryKey: ['customerPurchases', customerId],
    queryFn: () => fetchCustomerPurchases(customerId),
  })
}
