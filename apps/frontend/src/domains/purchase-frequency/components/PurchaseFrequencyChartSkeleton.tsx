export function PurchaseFrequencyChartSkeleton() {
  return (
    <div className="h-125 w-full animate-pulse">
      <div className="flex h-full items-end justify-between gap-4 px-4 pb-8">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-lg bg-brand-gray-300"
            style={{ height: `${Math.random() * 60 + 20}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between px-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="h-4 w-12 rounded bg-brand-gray-300" />
        ))}
      </div>
    </div>
  )
}
