export class CustomerListError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'CustomerListError'
    this.status = status
  }

  get isSearchError(): boolean {
    return this.status === 400 || this.status === 404
  }
}
