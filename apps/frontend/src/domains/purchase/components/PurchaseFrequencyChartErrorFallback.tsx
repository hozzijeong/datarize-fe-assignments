import { type FallbackProps } from 'react-error-boundary'
import { PurchaseFrequencyError } from '../errors/PurchaseFrequencyError'

function getErrorMessage(error: PurchaseFrequencyError | null): string {
  if (!error) return '차트를 불러오는데 실패했습니다.'

  switch (error.code) {
    case 'MISSING_DATE_PARAM':
      return '시작일과 종료일을 모두 선택해주세요.'
    case 'INVALID_DATE_FORMAT':
      return '날짜 형식이 올바르지 않습니다.'
    case 'INVALID_DATE_RANGE':
      return '시작일이 종료일보다 늦을 수 없습니다.'
    case 'PRODUCT_NOT_FOUND':
      return '상품 정보를 찾을 수 없습니다.'
    case 'SERVER_ERROR':
      return '서버에서 오류가 발생했습니다.'
    default:
      return '차트를 불러오는데 실패했습니다.'
  }
}

export function PurchaseFrequencyChartErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const purchaseError = error instanceof PurchaseFrequencyError ? error : null
  const message = getErrorMessage(purchaseError)
  const buttonText = purchaseError?.isDateError ? '날짜 다시 선택하기' : '다시 시도하기'

  return (
    <div className="flex h-125 flex-col items-center justify-center">
      <div className="text-center">
        <p className="mb-5 text-lg font-semibold text-brand-black-1100">{message}</p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-brand-green-1000 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-1100"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
