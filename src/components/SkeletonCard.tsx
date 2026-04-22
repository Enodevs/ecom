export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" aria-hidden="true">
      <div className="aspect-square shimmer" />
      <div className="p-3 space-y-2">
        <div className="shimmer h-2.5 w-2/5 rounded-full" />
        <div className="shimmer h-3 w-4/5 rounded-full" />
        <div className="shimmer h-3 w-3/5 rounded-full" />
        <div className="shimmer h-4 w-1/3 rounded-full mt-1" />
      </div>
    </div>
  );
}
