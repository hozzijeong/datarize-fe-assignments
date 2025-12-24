import { useFetchPurchaseFrequency } from '@/domains/purchase/queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyChart } from '@/domains/purchase/components/PurchaseFrequencyChart'
import { useFetchCustomers } from '@/domains/customers/queries/useFetchCustomers'
import { CustomerList } from '@/domains/customers/components/CustomerList'
import { useDebounce } from '@/hooks/useDebounce'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function DashBoardPage() {
  const [searchName, setSearchName] = useState('')
  const debouncedSearchName = useDebounce(searchName, 300)

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8">
      <section className="mb-12">
        <h1 className="mb-6 text-2xl font-bold">가격대별 구매 빈도</h1>
        <ErrorBoundary fallback={<div>차트를 불러오는 중 오류가 발생했습니다.</div>}>
          <Suspense fallback={<div className="flex h-[400px] items-center justify-center">로딩 중...</div>}>
            <PurchaseFrequencySection />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">고객 목록</h2>
          <input
            type="text"
            placeholder="고객 이름 검색..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full max-w-xs rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <ErrorBoundary fallback={<div>고객 목록을 불러오는 중 오류가 발생했습니다.</div>}>
          <Suspense fallback={<div className="py-8 text-center">로딩 중...</div>}>
            <CustomerSection searchName={debouncedSearchName} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  )
}

function PurchaseFrequencySection() {
  const { data } = useFetchPurchaseFrequency()

  return <PurchaseFrequencyChart data={data} />
}

function CustomerSection({ searchName }: { searchName: string }) {
  const { data } = useFetchCustomers(searchName ? { name: searchName } : undefined)

  return <CustomerList data={data} />
}
