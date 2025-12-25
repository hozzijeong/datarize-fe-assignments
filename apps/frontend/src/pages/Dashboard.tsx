import { useFetchPurchaseFrequency } from '@/domains/purchase-frequency/queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyChart } from '@/domains/purchase-frequency/components/PurchaseFrequencyChart'
import { DateRangePicker, type DateRangePickerRef } from '@/domains/purchase-frequency/components/DateRangePicker'
import { useFetchCustomers } from '@/domains/customer/customer-list/queries/useFetchCustomers'
import { CustomerList } from '@/domains/customer/customer-list/components/CustomerList'
import { SearchInput } from '@/domains/customer/customer-list/components/SearchInput'
import { useCustomerSearch } from '@/domains/customer/customer-list/hooks/useCustomerSearch'
import { Suspense, useCallback, useDeferredValue, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

import { Order } from '@/domains/customer/types'
import type { PurchaseFrequencyParams } from '@/domains/purchase-frequency/types'

export function DashBoardPage() {
  return (
    <>
      <PurchaseFrequencySection />
      <div className="w-full h-0.5 bg-gray-200 " />
      <CustomerSection />
    </>
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
    <section className="mt-10">
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
  const { searchName, submittedSearchName, searchError, handleSearchChange, handleSearch, resetSearch } =
    useCustomerSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">고객 목록</h2>
        <div className="relative">
          <SearchInput
            ref={inputRef}
            value={searchName}
            placeholder="고객 이름 검색..."
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          {searchError && <span className="absolute -bottom-5 left-1 text-red-500 text-sm">{searchError}</span>}
        </div>
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
              <CustomerListBox searchName={submittedSearchName} />
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

  const deferredFetchParams = useDeferredValue({ name: searchName, sortBy: order })

  const { data } = useFetchCustomers(deferredFetchParams)

  return (
    <CustomerList key={`list-${searchName}-${order}`} data={data} order={order} handleChangeOrder={handleChangeOrder} />
  )
}
