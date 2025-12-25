const SKELETON_ROWS = 10

function SkeletonRow() {
  return (
    <tr className="border-b border-brand-gray-200">
      <td className="px-4 py-3">
        <div className="h-5 w-8 animate-pulse rounded bg-brand-gray-300" />
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-20 animate-pulse rounded bg-brand-gray-300" />
      </td>
      <td className="px-4 py-3 text-right">
        <div className="ml-auto h-5 w-12 animate-pulse rounded bg-brand-gray-300" />
      </td>
      <td className="px-4 py-3 text-right">
        <div className="ml-auto h-5 w-24 animate-pulse rounded bg-brand-gray-300" />
      </td>
    </tr>
  )
}

export function CustomerListSkeleton() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-brand-gray-300 bg-brand-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">이름</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">구매 횟수</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">구매 금액</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded bg-brand-gray-300" />
        <div className="h-8 w-8 animate-pulse rounded bg-brand-gray-300" />
        <div className="h-8 w-8 animate-pulse rounded bg-brand-gray-300" />
      </div>

      <div className="mt-2 flex justify-center">
        <div className="h-5 w-40 animate-pulse rounded bg-brand-gray-300" />
      </div>
    </div>
  )
}
