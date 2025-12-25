export const DATE_PATTERNS = {
  ISO_8601: /^\d{4}-\d{2}-\d{2}$/,
} as const

export const DATE_ERROR_MESSAGES = {
  MISSING_BOTH: '시작일과 종료일을 모두 선택해주세요.',
  INVALID_FORMAT: '날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)',
  INVALID_RANGE: '시작일이 종료일보다 늦을 수 없습니다.',
} as const

export type DateRange = {
  from?: string
  to?: string
}

export type DateRangeValidationResult =
  | { valid: true; error: null }
  | { valid: false; error: string }

export function validateDateRange(dateRange: DateRange): DateRangeValidationResult {
  const { from, to } = dateRange

  if (from || to) {
    if (!from || !to) {
      return { valid: false, error: DATE_ERROR_MESSAGES.MISSING_BOTH }
    }

    if (!DATE_PATTERNS.ISO_8601.test(from) || !DATE_PATTERNS.ISO_8601.test(to)) {
      return { valid: false, error: DATE_ERROR_MESSAGES.INVALID_FORMAT }
    }

    if (from > to) {
      return { valid: false, error: DATE_ERROR_MESSAGES.INVALID_RANGE }
    }
  }

  return { valid: true, error: null }
}
