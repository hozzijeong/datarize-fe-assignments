/**
 * @description 구매 빈도 API 에러 코드
 *
 * - MISSING_DATE_PARAM: 시작일/종료일 중 하나만 입력된 경우
 * - INVALID_DATE_FORMAT: 날짜 형식이 올바르지 않은 경우
 * - INVALID_DATE_RANGE: 시작일이 종료일보다 늦은 경우
 * - PRODUCT_NOT_FOUND: 상품을 찾을 수 없는 경우
 * - SERVER_ERROR: 서버 내부 오류
 * - UNKNOWN_ERROR: 분류되지 않은 오류
 */
export type PurchaseFrequencyErrorCode =
  | 'MISSING_DATE_PARAM'
  | 'INVALID_DATE_FORMAT'
  | 'INVALID_DATE_RANGE'
  | 'PRODUCT_NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR'

/**
 * @description HTTP 상태 코드와 서버 메시지를 기반으로 에러 코드를 분류합니다.
 * @param status - HTTP 상태 코드
 * @param message - 서버에서 반환된 에러 메시지
 * @returns 분류된 에러 코드
 */
function getErrorCode(status: number, message?: string): PurchaseFrequencyErrorCode {
  if (status === 500) return 'SERVER_ERROR'
  if (status !== 400) return 'UNKNOWN_ERROR'

  // 400 에러의 경우 서버 메시지를 파싱하여 구체적인 에러 코드 반환
  if (message?.includes('Both from and to must be provided')) return 'MISSING_DATE_PARAM'
  if (message?.includes('Invalid date format')) return 'INVALID_DATE_FORMAT'
  if (message?.includes('From date must be before to date')) return 'INVALID_DATE_RANGE'
  if (message?.includes('Product with ID')) return 'PRODUCT_NOT_FOUND'

  return 'UNKNOWN_ERROR'
}

/**
 * @description 구매 빈도 API 전용 에러 클래스
 *
 * ErrorBoundary에서 에러 유형에 따라 다른 UI를 표시하기 위해 사용됩니다.
 * isDateError getter로 날짜 관련 에러인지 빠르게 판별할 수 있습니다.
 */
export class PurchaseFrequencyError extends Error {
  /** @description HTTP 상태 코드 */
  status: number
  /** @description 분류된 에러 코드 */
  code: PurchaseFrequencyErrorCode

  /**
   * @param message - 사용자에게 표시할 에러 메시지
   * @param status - HTTP 상태 코드
   * @param serverMessage - 서버에서 반환된 원본 에러 메시지 (에러 코드 분류에 사용)
   */
  constructor(message: string, status: number, serverMessage?: string) {
    super(message)
    this.name = 'PurchaseFrequencyError'
    this.status = status
    this.code = getErrorCode(status, serverMessage)
  }

  /**
   * @description 날짜 입력 관련 에러인지 확인합니다.
   * true인 경우 DateRangePicker를 초기화하여 에러를 복구합니다.
   */
  get isDateError(): boolean {
    return (
      this.code === 'MISSING_DATE_PARAM' || this.code === 'INVALID_DATE_FORMAT' || this.code === 'INVALID_DATE_RANGE'
    )
  }
}
