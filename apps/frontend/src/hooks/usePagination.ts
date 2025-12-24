import { useState, useMemo } from 'react'

interface UsePaginationResult<T> {
  currentPage: number
  totalPages: number
  startIndex: number
  paginatedData: T[]
  handlePageChange: (page: number) => void
}

export function usePagination<T>(data: T[], itemsPerPage: number): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedData = useMemo(
    () => data.slice(startIndex, startIndex + itemsPerPage),
    [data, startIndex, itemsPerPage]
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return {
    currentPage,
    totalPages,
    startIndex,
    paginatedData,
    handlePageChange,
  }
}
