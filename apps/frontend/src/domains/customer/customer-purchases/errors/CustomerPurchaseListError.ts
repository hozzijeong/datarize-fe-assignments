export class CustomerPurchaseListError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'CustomerPurchaseListError'
    this.status = status
  }
}
