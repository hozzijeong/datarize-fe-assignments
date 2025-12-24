import { IconUpArrow } from '../assets/IconUpArrow'
import type { Order } from '../types'

export function OrderDirectionItem({ order }: { order: Order }) {
  return (
    <div className="flex flex-col gap-1">
      <IconUpArrow className={order === 'asc' ? 'text-red-500' : 'text-gray-400'} width={6} height={5} />
      <IconUpArrow
        className={`${order === 'desc' ? 'text-red-500' : 'text-gray-400'} rotate-180`}
        width={6}
        height={5}
      />
    </div>
  )
}
