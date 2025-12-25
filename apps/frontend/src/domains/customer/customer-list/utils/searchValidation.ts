export const SEARCH_PATTERNS = {
  NUMBERS: /[0-9]/g,
  HAS_NUMBERS: /[0-9]/,
  INCOMPLETE_KOREAN: /[ㄱ-ㅎㅏ-ㅣ]/,
} as const

/**
 * 입력값에서 숫자를 제거합니다.
 */
export function removeNumbers(value: string): string {
  return value.replace(SEARCH_PATTERNS.NUMBERS, '')
}

/**
 * 문자열이 완성된 한글 또는 영어로만 구성되어 있는지 확인합니다.
 * 미완성 한글(ㄱ, ㅏ 등)이 포함되어 있으면 false를 반환합니다.
 */
export function isCompleteKoreanOrEnglish(str: string): boolean {
  if (!str) return true
  return !SEARCH_PATTERNS.INCOMPLETE_KOREAN.test(str)
}

/**
 * 검색어를 정제합니다.
 * - 미완성 한글이 포함되어 있으면 빈 문자열 반환
 * - 완성된 한글/영어만 있으면 그대로 반환
 */
export function sanitizeSearchQuery(query: string): string {
  return isCompleteKoreanOrEnglish(query) ? query : ''
}
