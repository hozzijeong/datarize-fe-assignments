import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useFetchCustomerPurchases } from '@/domains/customers/queries/useFetchCustomerPurchases'
import { OrderList } from '@/domains/customers/components/OrderList'

export function OrdersDetail() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center text-brand-black-700">잘못된 접근입니다.</div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-1 rounded-md border border-brand-gray-300 px-3 py-1.5 text-sm text-brand-black-900 transition-colors hover:bg-brand-green-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          목록으로
        </Link>
        <h1 className="text-2xl font-bold">고객 #{id} 주문 내역</h1>
      </div>
      <ErrorBoundary fallback={<div>주문 내역을 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div className="py-8 text-center">로딩 중...</div>}>
          <OrderListBox customerId={id} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

function OrderListBox({ customerId }: { customerId: string }) {
  const { data } = useFetchCustomerPurchases(customerId)

  return <OrderList data={data} />
}
