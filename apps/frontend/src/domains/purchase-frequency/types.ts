export interface PurchaseFrequency {
  range: string
  count: number
}

export type PurchaseFrequencyParams = { from: string; to: string } | undefined
