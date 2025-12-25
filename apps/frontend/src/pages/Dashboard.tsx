import { useFetchPurchaseFrequency } from '@/domains/purchase/queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyChart } from '@/domains/purchase/components/PurchaseFrequencyChart'
import { useFetchCustomers } from '@/domains/customers/queries/useFetchCustomers'
import { CustomerList } from '@/domains/customers/components/CustomerList'
import { useDebounce } from '@/hooks/useDebounce'
import { Suspense, useCallback, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Order } from '@/domains/customers/types'

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
  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">가격대별 구매 빈도</h1>
      <ErrorBoundary fallback={<div>차트를 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div className="flex h-100 items-center justify-center">로딩 중...</div>}>
          <PurchaseFrequencyChartBox />
        </Suspense>
      </ErrorBoundary>
    </section>
  )
}

function PurchaseFrequencyChartBox() {
  const { data } = useFetchPurchaseFrequency()

  return <PurchaseFrequencyChart data={data} />
}

function CustomerSection() {
  const [searchName, setSearchName] = useState('')
  const debouncedSearchName = useDebounce(searchName, 300)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">고객 목록</h2>
        <input
          type="text"
          placeholder="고객 이름 검색..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 focus:border-brand-green-800 focus:outline-none"
        />
      </div>
      <ErrorBoundary fallback={<div>고객 목록을 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div className="py-8 text-center">로딩 중...</div>}>
          <CustomerListBox searchName={debouncedSearchName} />
        </Suspense>
      </ErrorBoundary>
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
