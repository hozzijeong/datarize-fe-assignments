import { useState } from 'react'
import { removeNumbers, isCompleteKoreanOrEnglish, sanitizeSearchQuery, SEARCH_PATTERNS } from '../utils/searchValidation'

/**
 * 고객 검색 훅
 *
 * - 실시간 필터링이 아닌 명시적 검색 방식 사용
 * - handleSearch 호출 시에만 실제 검색어(submittedSearchName)가 업데이트됨
 * - 입력값(searchName)과 제출된 검색어(submittedSearchName)를 분리하여
 *   사용자가 검색 버튼을 누르거나 Enter를 입력해야 검색이 실행됨
 * - 숫자 입력 시 에러 메시지 표시 및 자동 제거
 * - 미완성 한글 입력 시 에러 메시지 표시
 */
export function useCustomerSearch() {
  const [searchName, setSearchName] = useState('')
  const [submittedSearchName, setSubmittedSearchName] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)

  const handleSearchChange = (value: string) => {
    // 숫자 입력 감지
    if (SEARCH_PATTERNS.HAS_NUMBERS.test(value)) {
      setSearchError('숫자는 입력할 수 없습니다.')
    } else if (searchError) {
      setSearchError(null)
    }

    const sanitizedValue = removeNumbers(value)
    setSearchName(sanitizedValue)
  }

  const handleSearch = () => {
    // 미완성 한글 검증
    if (!isCompleteKoreanOrEnglish(searchName)) {
      setSearchError('완성된 한글 또는 영어만 검색할 수 있습니다.')
      return
    }

    setSearchError(null)
    const validSearchName = sanitizeSearchQuery(searchName)
    setSubmittedSearchName(validSearchName)
  }

  const resetSearch = () => {
    setSearchName('')
    setSubmittedSearchName('')
    setSearchError(null)
  }

  return {
    searchName,
    submittedSearchName,
    searchError,
    handleSearchChange,
    handleSearch,
    resetSearch,
  }
}
