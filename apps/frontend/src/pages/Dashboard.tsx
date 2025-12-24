import { useFetchPurchaseFrequency } from '@/domains/purchase/queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyChart } from '@/domains/purchase/components/PurchaseFrequencyChart'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function DashBoardPage() {
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">가격대별 구매 빈도</h1>
      <ErrorBoundary fallback={<div>차트를 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div className="flex h-[400px] items-center justify-center">로딩 중...</div>}>
          <PurchaseFrequencySection />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

function PurchaseFrequencySection() {
  const { data } = useFetchPurchaseFrequency()

  return <PurchaseFrequencyChart data={data} />
}
