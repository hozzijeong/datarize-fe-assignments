export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface CustomerParams {
  sortBy?: 'asc' | 'desc'
  name?: string
}
