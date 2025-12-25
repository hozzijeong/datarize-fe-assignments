import { IconUpArrow } from '../../assets/IconUpArrow'
import type { Order } from '../../types'

export function OrderDirectionItem({ order }: { order: Order }) {
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
