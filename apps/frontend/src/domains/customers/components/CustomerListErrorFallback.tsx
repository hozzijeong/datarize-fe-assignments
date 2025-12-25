import { type FallbackProps } from 'react-error-boundary'
import { CustomerListError } from '../errors/CustomerListError'

function getErrorMessage(status?: number): string {
  switch (status) {
    case 400:
      return '잘못된 검색 조건입니다.'
    case 404:
      return '검색 결과가 없습니다.'
    case 500:
      return '서버에서 오류가 발생했습니다.'
    default:
      return '고객 목록을 불러오는데 실패했습니다.'
  }
}

export function CustomerListErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const customerError = error instanceof CustomerListError ? error : null
  const message = getErrorMessage(customerError?.status)
  const buttonText = customerError?.isSearchError ? '다시 검색하기' : '다시 시도하기'

  return (
    <div className="flex min-h-132 flex-col items-center justify-center">
      <div className="text-center">
        <p className="mb-5 whitespace-pre-line text-lg font-semibold text-brand-black-1100">
          {message}
        </p>
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
