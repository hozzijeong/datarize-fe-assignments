interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        이전
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded border px-3 py-1 text-sm ${
            currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        다음
      </button>
    </div>
  )
}
