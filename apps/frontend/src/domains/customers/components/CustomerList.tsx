import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Customer, Order } from '../types'
import { OrderDirectionItem } from './OrderDirectionItem'

const ITEMS_PER_PAGE = 10

interface CustomerListProps {
  data: Customer[]
  order?: Order
  handleChangeOrder: () => void
}

export function CustomerList({ data, order, handleChangeOrder }: CustomerListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">이름</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">구매 횟수</th>
              <th className="px-4 py-3 text-sm font-semibold" align="right">
                <button className="flex items-center justify-center gap-2" onClick={handleChangeOrder}>
                  구매 금액
                  <OrderDirectionItem order={order} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50 active:bg-gray-200">
                <td className="text-sm">
                  <Link to={`/orders/${customer.id}`} className="block px-4 py-3">
                    {customer.id}
                  </Link>
                </td>
                <td className="text-sm">
                  <Link to={`/orders/${customer.id}`} className="block px-4 py-3" tabIndex={-1}>
                    {customer.name}
                  </Link>
                </td>
                <td className="text-right text-sm">
                  <Link to={`/orders/${customer.id}`} className="block px-4 py-3" tabIndex={-1}>
                    {customer.count}회
                  </Link>
                </td>
                <td className="text-right text-sm">
                  <Link to={`/orders/${customer.id}`} className="block px-4 py-3" tabIndex={-1}>
                    {customer.totalAmount.toLocaleString()}원
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`rounded border px-3 py-1 text-sm ${
                currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      <div className="mt-2 text-center text-sm text-gray-500">
        총 {data.length}명 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, data.length)}명 표시
      </div>
    </div>
  )
}
