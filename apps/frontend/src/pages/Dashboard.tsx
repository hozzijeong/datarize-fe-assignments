import { useFetchPurchaseFrequency } from '@/domains/purchase/queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyChart } from '@/domains/purchase/components/PurchaseFrequencyChart'
import { DateRangePicker, type DateRangePickerRef } from '@/domains/purchase/components/DateRangePicker'
import { useFetchCustomers } from '@/domains/customers/queries/useFetchCustomers'
import { CustomerList } from '@/domains/customers/components/CustomerList'
import { SearchInput } from '@/domains/customers/components/SearchInput'
import { useCustomerSearch } from '@/domains/customers/hooks/useCustomerSearch'
import { Suspense, useCallback, useDeferredValue, useRef, useState } from 'react'
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
  const [appliedDateRange, setAppliedDateRange] = useState<PurchaseFrequencyParams>()
  const dateRangePickerRef = useRef<DateRangePickerRef>(null)

  const handleApplyDate = (dateRange: PurchaseFrequencyParams) => {
    setAppliedDateRange(dateRange)
  }

  const handleReset = () => {
    setAppliedDateRange(undefined)
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">가격대별 구매 빈도</h1>
        <DateRangePicker ref={dateRangePickerRef} onApply={handleApplyDate} onReset={handleReset} />
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={() => {
              reset()
              handleReset()
              dateRangePickerRef.current?.reset()
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
  const deferredParams = useDeferredValue(params)
  const { data } = useFetchPurchaseFrequency(deferredParams)

  return <PurchaseFrequencyChart data={data} />
}

function CustomerSection() {
  const { searchName, validSearchName, handleSearchChange, resetSearch } = useCustomerSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">고객 목록</h2>
        <SearchInput
          ref={inputRef}
          value={searchName}
          placeholder="고객 이름 검색..."
          onChange={handleSearchChange}
        />
      </div>
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
                  resetSearch()
                }}
              />
            )}
          >
            <Suspense fallback={<CustomerList.Fallback />}>
              <CustomerListBox searchName={validSearchName} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  )
}

function CustomerListBox({ searchName }: { searchName: string }) {
  const deferredSearchName = useDeferredValue(searchName)
  const [order, setOrder] = useState<Order>()

  const handleChangeOrder = useCallback(() => {
    setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }, [])

  const { data } = useFetchCustomers({ name: deferredSearchName, sortBy: order })

  return (
    <CustomerList
      key={`list-${deferredSearchName}-${order}`}
      data={data}
      order={order}
      handleChangeOrder={handleChangeOrder}
    />
  )
}
