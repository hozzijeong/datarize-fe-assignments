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
        <div className="text-center text-gray-500">잘못된 접근입니다.</div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard" className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
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
