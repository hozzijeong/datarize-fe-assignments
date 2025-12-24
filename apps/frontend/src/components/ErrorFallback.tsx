import type { FallbackProps } from 'react-error-boundary'

/**
 * @description 전역 에러바운더리 설정
 */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-red-600">오류가 발생했습니다</h1>
      <p className="text-gray-600">{error.message}</p>
      <button onClick={resetErrorBoundary} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        다시 시도
      </button>
    </div>
  )
}
