import { useFetchPurchaseFrequency } from '@/domains/purchase/queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyChart } from '@/domains/purchase/components/PurchaseFrequencyChart'
import { useFetchCustomers } from '@/domains/customers/queries/useFetchCustomers'
import { CustomerList } from '@/domains/customers/components/CustomerList'
import { useDebounce } from '@/hooks/useDebounce'
import { Suspense, useCallback, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

import { Order } from '@/domains/customers/types'
import type { PurchaseFrequencyParams } from '@/domains/purchase/types'

export function DashBoardPage() {
  return (
    <main className="mx-auto max-w-7xl flex flex-col gap-15 px-4 py-8">
      <PurchaseFrequencySection />
      <div className="w-full h-0.5 bg-gray-200 " />
      <CustomerSection />
    </main>
  )
}

function PurchaseFrequencySection() {
  const [inputDateRange, setInputDateRange] = useState<{ from?: string; to?: string }>({})
  const [appliedDateRange, setAppliedDateRange] = useState<PurchaseFrequencyParams>()
  const [dateError, setDateError] = useState<string | null>(null)

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDateRange((prev) => ({ ...prev, from: e.target.value }))
    setDateError(null)
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDateRange((prev) => ({ ...prev, to: e.target.value }))
    setDateError(null)
  }

  const handleApplyDate = () => {
    const iso8601DatePattern = /^\d{4}-\d{2}-\d{2}$/

    if (inputDateRange.from || inputDateRange.to) {
      if (!inputDateRange.from || !inputDateRange.to) {
        setDateError('시작일과 종료일을 모두 선택해주세요.')
        return
      }

      if (!iso8601DatePattern.test(inputDateRange.from) || !iso8601DatePattern.test(inputDateRange.to)) {
        setDateError('날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)')
        return
      }

      if (inputDateRange.from > inputDateRange.to) {
        setDateError('시작일이 종료일보다 늦을 수 없습니다.')
        return
      }
    }

    setDateError(null)
    setAppliedDateRange(
      inputDateRange.from && inputDateRange.to ? { from: inputDateRange.from, to: inputDateRange.to } : undefined,
    )
  }

  const handleReset = () => {
    setInputDateRange({})
    setAppliedDateRange(undefined)
    setDateError(null)
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">가격대별 구매 빈도</h1>
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
              onClick={handleApplyDate}
              className="cursor-pointer rounded-md bg-brand-green-1000 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-green-1100"
            >
              날짜 적용
            </button>
            {appliedDateRange && (
              <button
                onClick={handleReset}
                className="cursor-pointer rounded-md border border-brand-gray-300 px-3 py-1.5 text-sm text-brand-black-900 transition-colors hover:bg-brand-green-100"
              >
                초기화
              </button>
            )}
          </div>
          {dateError && <span className="text-sm absolute text-right text-red-500">{dateError}</span>}
        </div>
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={() => {
              reset()
              handleReset()
            }}
            FallbackComponent={PurchaseFrequencyChart.ErrorFallback}
          >
            <Suspense fallback={<PurchaseFrequencyChart.Fallback />}>
              <PurchaseFrequencyChartBox params={appliedDateRange} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  )
}

function PurchaseFrequencyChartBox({ params }: { params?: PurchaseFrequencyParams }) {
  const { data } = useFetchPurchaseFrequency(params)

  return <PurchaseFrequencyChart data={data} />
}

function CustomerSection() {
  const [searchName, setSearchName] = useState('')
  const debouncedSearchName = useDebounce(searchName, 300)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // TODO: 검색시 숫자는 제외, 완성된 한글이 아닌 경우 제외 완성된 한글만 검색되거나 영어만 검색되도록 처리할 것. 영어 + 한글은 처리 안되도록 하기
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">고객 목록</h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="고객 이름 검색..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 focus:border-brand-green-800 focus:outline-none"
        />
      </div>
      {/* NOTE: 검색 실패시 쿼리 초기화 및 검색창 focus 적용. 근데 이게 검색 실패에 대한 에러만 처리하는건가? 한번 생각해 볼 필요 있음 */}
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={(props) => (
              <CustomerList.ErrorFallback
                {...props}
                resetErrorBoundary={(params) => {
                  props.resetErrorBoundary({ ...params })
                  inputRef.current?.focus()
                  setSearchName('')
                }}
              />
            )}
          >
            <Suspense fallback={<CustomerList.Fallback />}>
              <CustomerListBox searchName={debouncedSearchName} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  )
}

function CustomerListBox({ searchName }: { searchName: string }) {
  const [order, setOrder] = useState<Order>()

  const handleChangeOrder = useCallback(() => {
    setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }, [])

  const { data } = useFetchCustomers({ name: searchName, sortBy: order })

  return (
    <CustomerList key={`list-${searchName}-${order}`} data={data} order={order} handleChangeOrder={handleChangeOrder} />
  )
}
