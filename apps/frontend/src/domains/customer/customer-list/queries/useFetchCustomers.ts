import { useSuspenseQuery } from '@tanstack/react-query'
import type { Customer, CustomerParams } from '../../types'
import { CustomerListError } from '../errors/CustomerListError'

function buildUrl(params?: CustomerParams): string {
  const searchParams = new URLSearchParams()

  if (params?.sortBy) searchParams.set('sortBy', params.sortBy)
  if (params?.name) searchParams.set('name', params.name)

  const query = searchParams.toString()
  return query ? `/api/customers?${query}` : '/api/customers'
}

async function fetchCustomers(params?: CustomerParams): Promise<Customer[]> {
  const response = await fetch(buildUrl(params))

  if (!response.ok) {
    throw new CustomerListError('Failed to fetch customers', response.status)
  }

  return response.json()
}

export function useFetchCustomers(params?: CustomerParams) {
  return useSuspenseQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
  })
}
