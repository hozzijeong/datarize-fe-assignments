import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { removeNumbers, sanitizeSearchQuery } from '../utils/searchValidation'

interface UseCustomerSearchOptions {
  debounceMs?: number
}

export function useCustomerSearch({ debounceMs = 300 }: UseCustomerSearchOptions = {}) {
  const [searchName, setSearchName] = useState('')
  const debouncedSearchName = useDebounce(searchName, debounceMs)
  const validSearchName = sanitizeSearchQuery(debouncedSearchName)

  const handleSearchChange = (value: string) => {
    const sanitizedValue = removeNumbers(value)
    setSearchName(sanitizedValue)
  }

  const resetSearch = () => {
    setSearchName('')
  }

  return {
    searchName,
    validSearchName,
    handleSearchChange,
    resetSearch,
  }
}
