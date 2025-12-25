import { type FallbackProps } from 'react-error-boundary'
import { CustomerPurchaseListError } from '../errors/CustomerPurchaseListError'

function getErrorMessage(status?: number): string {
  switch (status) {
    case 400:
      return '잘못된 고객 ID입니다.'
    case 404:
      return '해당 고객을 찾을 수 없습니다.'
    case 500:
      return '서버에서 오류가 발생했습니다.'
    default:
      return '주문 내역을 불러오는데 실패했습니다.'
  }
}

export function CustomerPurchaseListErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const purchaseError = error instanceof CustomerPurchaseListError ? error : null
  const message = getErrorMessage(purchaseError?.status)

  return (
    <div className="flex min-h-125 flex-col items-center justify-center">
      <div className="text-center">
        <p className="mb-5 whitespace-pre-line text-lg font-semibold text-brand-black-1100">
          {message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-brand-green-1000 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-1100"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  )
}
