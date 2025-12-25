import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { useFetchCustomerPurchases } from '@/domains/customer/customer-purchases/queries/useFetchCustomerPurchases'
import { CustomerPurchaseList } from '@/domains/customer/customer-purchases/components/CustomerPurchaseList'
import { ChevronLeftIcon } from '@/assets/ChevronLeftIcon'

export function OrdersDetail() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <>
        <div className="mt-10 text-center text-brand-black-700">잘못된 접근입니다.</div>
      </>
    )
  }

  return (
    <>
      <div className="mt-10 mb-6 flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-1 rounded-md border border-brand-gray-300 px-3 py-1.5 text-sm text-brand-black-900 transition-colors hover:bg-brand-green-100"
        >
          <ChevronLeftIcon />
          목록으로
        </Link>
        <h1 className="text-2xl font-bold">고객 #{id} 주문 내역</h1>
      </div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={CustomerPurchaseList.ErrorFallback}>
            <Suspense fallback={<CustomerPurchaseList.Fallback />}>
              <CustomerPurchaseListBox customerId={id} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  )
}

function CustomerPurchaseListBox({ customerId }: { customerId: string }) {
  const { data } = useFetchCustomerPurchases(customerId)

  return <CustomerPurchaseList data={data} />
}
