import { forwardRef, useImperativeHandle, useState } from 'react'
import { validateDateRange, type DateRange } from '../utils/dateValidation'
import type { PurchaseFrequencyParams } from '../types'

export interface DateRangePickerRef {
  reset: () => void
}

interface DateRangePickerProps {
  onApply: (dateRange: PurchaseFrequencyParams) => void
  onReset: () => void
}

export const DateRangePicker = forwardRef<DateRangePickerRef, DateRangePickerProps>(function DateRangePicker(
  { onApply, onReset },
  ref,
) {
  const [inputDateRange, setInputDateRange] = useState<DateRange>({})
  const [dateError, setDateError] = useState<string | null>(null)
  const [isApplied, setIsApplied] = useState(false)

  const resetState = () => {
    setInputDateRange({})
    setDateError(null)
    setIsApplied(false)
  }

  useImperativeHandle(ref, () => ({
    reset: resetState,
  }))

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDateRange((prev) => ({ ...prev, from: e.target.value }))
    setDateError(null)
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDateRange((prev) => ({ ...prev, to: e.target.value }))
    setDateError(null)
  }

  const handleApply = () => {
    const result = validateDateRange(inputDateRange)

    if (!result.valid) {
      setDateError(result.error)
      return
    }

    setDateError(null)
    const appliedRange =
      inputDateRange.from && inputDateRange.to
        ? { from: inputDateRange.from, to: inputDateRange.to }
        : undefined

    setIsApplied(!!appliedRange)
    onApply(appliedRange)
  }

  const handleReset = () => {
    resetState()
    onReset()
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="from-date" className="text-sm text-brand-black-900">
            시작일
          </label>
          <input
            id="from-date"
            type="date"
            value={inputDateRange.from || ''}
            onChange={handleFromChange}
            className="rounded-md border border-brand-gray-300 px-3 py-1.5 text-sm focus:border-brand-green-800 focus:outline-none"
          />
        </div>
        <span className="text-brand-black-700">~</span>
        <div className="flex items-center gap-2">
          <label htmlFor="to-date" className="text-sm text-brand-black-900">
            종료일
          </label>
          <input
            id="to-date"
            type="date"
            value={inputDateRange.to || ''}
            onChange={handleToChange}
            className="rounded-md border border-brand-gray-300 px-3 py-1.5 text-sm focus:border-brand-green-800 focus:outline-none"
          />
        </div>
        <button
          onClick={handleApply}
          className="cursor-pointer rounded-md bg-brand-green-1000 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-green-1100"
        >
          날짜 적용
        </button>
        {isApplied && (
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-md border border-brand-gray-300 px-3 py-1.5 text-sm text-brand-black-900 transition-colors hover:bg-brand-green-100"
          >
            초기화
          </button>
        )}
      </div>
      {dateError && <span className="absolute text-sm text-right text-red-500">{dateError}</span>}
    </div>
  )
})
