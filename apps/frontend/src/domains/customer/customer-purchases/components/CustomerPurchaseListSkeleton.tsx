const SKELETON_GROUPS = 3
const SKELETON_ITEMS_PER_GROUP = 2

function SkeletonItem() {
  return (
    <li className="flex items-center gap-4">
      <div className="h-16 w-16 animate-pulse rounded bg-brand-gray-300" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-32 animate-pulse rounded bg-brand-gray-300" />
        <div className="h-4 w-20 animate-pulse rounded bg-brand-gray-300" />
      </div>
      <div className="h-5 w-24 animate-pulse rounded bg-brand-gray-300" />
    </li>
  )
}

function SkeletonGroup() {
  return (
    <div className="rounded-lg border border-brand-gray-300 bg-white p-4">
      <div className="mb-4 border-b border-brand-gray-200 pb-2">
        <div className="h-6 w-28 animate-pulse rounded bg-brand-gray-300" />
      </div>
      <ul className="space-y-3">
        {Array.from({ length: SKELETON_ITEMS_PER_GROUP }).map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </ul>
    </div>
  )
}

export function CustomerPurchaseListSkeleton() {
  return (
    <div className="animate-delayed-fade-in">
      <div className="space-y-6">
        {Array.from({ length: SKELETON_GROUPS }).map((_, index) => (
          <SkeletonGroup key={index} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1">
        <div className="h-8 w-8 animate-pulse rounded-md bg-brand-gray-300" />
        <div className="h-8 w-8 animate-pulse rounded-md bg-brand-gray-300" />
        <div className="h-8 w-8 animate-pulse rounded-md bg-brand-gray-300" />
      </div>

      <div className="mt-2 flex justify-center">
        <div className="h-5 w-48 animate-pulse rounded bg-brand-gray-300" />
      </div>
    </div>
  )
}
