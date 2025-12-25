import { Link } from 'react-router-dom'
import { usePagination } from '@/hooks/usePagination'
import { Pagination } from '@/components/Pagination'
import type { Customer, Order } from '../../types'
import { CustomerListSkeleton } from './CustomerListSkeleton'
import { CustomerListErrorFallback } from './CustomerListErrorFallback'
import { IconUpArrow } from '../../assets/IconUpArrow'

const ITEMS_PER_PAGE = 10

interface CustomerListProps {
  data: Customer[]
  order?: Order
  handleChangeOrder: () => void
}

export function CustomerList({ data, order, handleChangeOrder }: CustomerListProps) {
  const { currentPage, totalPages, startIndex, paginatedData, handlePageChange } = usePagination(data, ITEMS_PER_PAGE)

  return (
    <div className="h-[600px]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-brand-gray-300 text-brand-black-1000 bg-brand-gray-100">
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
              <tr key={customer.id} className="border-b border-brand-gray-200 hover:bg-brand-gray-100">
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <div className="mt-2 text-center text-sm text-brand-black-700">
        총 {data.length}명 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, data.length)}명 표시
      </div>
    </div>
  )
}

CustomerList.Fallback = CustomerListSkeleton
CustomerList.ErrorFallback = CustomerListErrorFallback

function OrderDirectionItem({ order }: { order: Order }) {
  return (
    <div className="flex flex-col gap-1">
      <IconUpArrow className={order === 'asc' ? 'text-red-800' : 'text-brand-gray-700'} width={6} height={5} />
      <IconUpArrow
        className={`${order === 'desc' ? 'text-red-800' : 'text-brand-gray-700'} rotate-180`}
        width={6}
        height={5}
      />
    </div>
  )
}
