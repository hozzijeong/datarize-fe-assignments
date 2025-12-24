import { useState } from 'react'
import type { Purchase } from '../types'

const ITEMS_PER_PAGE = 5

interface OrderListProps {
  data: Purchase[]
}

interface GroupedPurchases {
  date: string
  purchases: Purchase[]
}

function groupByDate(purchases: Purchase[]): GroupedPurchases[] {
  const grouped: Record<string, Purchase[]> = {}

  purchases.forEach((purchase) => {
    if (!grouped[purchase.date]) {
      grouped[purchase.date] = []
    }
    grouped[purchase.date].push(purchase)
  })

  return Object.entries(grouped)
    .map(([date, purchases]) => ({ date, purchases }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function OrderList({ data }: OrderListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const groupedData = groupByDate(data)
  const totalPages = Math.ceil(groupedData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = groupedData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (data.length === 0) {
    return <div className="py-8 text-center text-gray-500">주문 내역이 없습니다.</div>
  }

  return (
    <div>
      <div className="space-y-6">
        {paginatedData.map((group) => (
          <div key={group.date} className="rounded-lg border bg-white p-4">
            <h3 className="mb-4 border-b pb-2 text-lg font-semibold">{group.date}</h3>
            <ul className="space-y-3">
              {group.purchases.map((purchase, index) => (
                <li key={index} className="flex items-center gap-4">
                  {purchase.imgSrc && (
                    <img
                      src={purchase.imgSrc}
                      alt={purchase.product}
                      className="h-16 w-16 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{purchase.product}</p>
                    <p className="text-sm text-gray-500">수량: {purchase.quantity}개</p>
                  </div>
                  <p className="font-semibold">{purchase.price.toLocaleString()}원</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
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
        총 {groupedData.length}개 날짜 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, groupedData.length)}개
        표시
      </div>
    </div>
  )
}
