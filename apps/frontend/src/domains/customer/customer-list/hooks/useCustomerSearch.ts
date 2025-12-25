import { useState } from 'react'
import { removeNumbers, sanitizeSearchQuery } from '../utils/searchValidation'

/**
 * 고객 검색 훅
 *
 * - 실시간 필터링이 아닌 명시적 검색 방식 사용
 * - handleSearch 호출 시에만 실제 검색어(submittedSearchName)가 업데이트됨
 * - 입력값(searchName)과 제출된 검색어(submittedSearchName)를 분리하여
 *   사용자가 검색 버튼을 누르거나 Enter를 입력해야 검색이 실행됨
 */
export function useCustomerSearch() {
  const [searchName, setSearchName] = useState('')
  const [submittedSearchName, setSubmittedSearchName] = useState('')

  const handleSearchChange = (value: string) => {
    const sanitizedValue = removeNumbers(value)
    setSearchName(sanitizedValue)
  }

  const handleSearch = () => {
    const validSearchName = sanitizeSearchQuery(searchName)
    setSubmittedSearchName(validSearchName)
  }

  const resetSearch = () => {
    setSearchName('')
    setSubmittedSearchName('')
  }

  return {
    searchName,
    submittedSearchName,
    handleSearchChange,
    handleSearch,
    resetSearch,
  }
}
