import { type FallbackProps } from 'react-error-boundary'

export function CustomerListErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[528px]">
      <div className="text-center">
        <p className="mb-5 text-lg font-semibold whitespace-pre-line text-brand-black-1100">
          {`고객 목록을 불러오는데 실패했습니다.\n다시 시도해주세요`}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-brand-green-1000 px-6 py-2 text-m font-medium text-white transition-colors hover:bg-brand-green-1100"
        >
          다시 검색하기
        </button>
      </div>
    </div>
  )
}
