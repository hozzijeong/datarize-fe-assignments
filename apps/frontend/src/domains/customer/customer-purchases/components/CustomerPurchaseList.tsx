import { useMemo } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { Pagination } from '@/components/Pagination'
import type { Purchase } from '../../types'
import { CustomerPurchaseListSkeleton } from './CustomerPurchaseListSkeleton'
import { CustomerPurchaseListErrorFallback } from './CustomerPurchaseListErrorFallback'

const ITEMS_PER_PAGE = 5

interface CustomerPurchaseListProps {
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

export function CustomerPurchaseList({ data }: CustomerPurchaseListProps) {
  const groupedData = useMemo(() => groupByDate(data), [data])

  const { currentPage, totalPages, startIndex, paginatedData, handlePageChange } = usePagination(
    groupedData,
    ITEMS_PER_PAGE,
  )

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-brand-black-700">
        <span>주문 내역이 없습니다.</span>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-6">
        {paginatedData.map((group) => (
          <div key={group.date} className="rounded-lg border border-brand-gray-300 bg-white p-4">
            <h3 className="mb-4 border-b border-brand-gray-200 pb-2 text-lg font-semibold text-brand-black-1100">
              {group.date}
            </h3>
            <ul className="space-y-3">
              {group.purchases.map((purchase) => (
                <li key={`${purchase.date}-${purchase.product}-${purchase.price}`} className="flex items-center gap-4">
                  {purchase.imgSrc && (
                    <img src={purchase.imgSrc} alt={purchase.product} className="h-16 w-16 rounded object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-brand-black-1100">{purchase.product}</p>
                    <p className="text-sm text-brand-black-700">수량: {purchase.quantity}개</p>
                  </div>
                  <p className="font-semibold text-brand-green-1100">{purchase.price.toLocaleString()}원</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <div className="mt-2 text-center text-sm text-brand-black-700">
        총 {groupedData.length}개 날짜 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, groupedData.length)}개
        표시
      </div>
    </div>
  )
}

CustomerPurchaseList.Fallback = CustomerPurchaseListSkeleton
CustomerPurchaseList.ErrorFallback = CustomerPurchaseListErrorFallback
