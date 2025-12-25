export type PurchaseFrequencyErrorCode =
  | 'MISSING_DATE_PARAM'
  | 'INVALID_DATE_FORMAT'
  | 'INVALID_DATE_RANGE'
  | 'PRODUCT_NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR'

function getErrorCode(status: number, message?: string): PurchaseFrequencyErrorCode {
  if (status === 500) return 'SERVER_ERROR'
  if (status !== 400) return 'UNKNOWN_ERROR'

  if (message?.includes('Both from and to must be provided')) return 'MISSING_DATE_PARAM'
  if (message?.includes('Invalid date format')) return 'INVALID_DATE_FORMAT'
  if (message?.includes('From date must be before to date')) return 'INVALID_DATE_RANGE'
  if (message?.includes('Product with ID')) return 'PRODUCT_NOT_FOUND'

  return 'UNKNOWN_ERROR'
}

export class PurchaseFrequencyError extends Error {
  status: number
  code: PurchaseFrequencyErrorCode

  constructor(message: string, status: number, serverMessage?: string) {
    super(message)
    this.name = 'PurchaseFrequencyError'
    this.status = status
    this.code = getErrorCode(status, serverMessage)
  }

  get isDateError(): boolean {
    return (
      this.code === 'MISSING_DATE_PARAM' ||
      this.code === 'INVALID_DATE_FORMAT' ||
      this.code === 'INVALID_DATE_RANGE'
    )
  }
}
