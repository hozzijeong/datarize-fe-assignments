export class OrderListError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'OrderListError'
    this.status = status
  }
}
