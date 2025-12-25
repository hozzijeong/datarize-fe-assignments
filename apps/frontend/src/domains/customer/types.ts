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

export type Order = CustomerParams['sortBy']

export interface Purchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}
