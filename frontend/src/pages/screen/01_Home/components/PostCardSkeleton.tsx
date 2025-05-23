export default function PostCardSkeleton() {
  return (
    <div className="p-2 md:p-4 border-b bg-gray-300 dark:bg-main/50 bg-primaryHover/50 cursor-wait animate-pulse">
      <div className="flex gap-2 md:gap-3">
        {/* Avatar */}
        <div className="w-8 md:w-10 h-8 md:h-10 shrink-0 rounded-full bg-gray-300 dark:bg-main/50" />

        <div className="flex-1">
          {/* Header Skeleton */}
          <div className="flex justify-between text-sm mb-2 flex-wrap gap-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-16 h-4 md:w-20 md:h-4 bg-gray-300 dark:bg-main/50 rounded" />
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-300 dark:bg-main/50" />
              <div className="w-20 h-4 md:w-24 md:h-4 bg-gray-300 dark:bg-main/50 rounded" />
            </div>
            <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-300 dark:bg-main/50 rounded-full" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-2 mb-2">
            <div className="w-full h-3 bg-gray-300 dark:bg-main/50 rounded" />
            <div className="w-5/6 h-3 bg-gray-300 dark:bg-main/50 rounded" />
          </div>

          {/* Media Grid Skeleton */}
          <div className="rounded-[20px] overflow-hidden mt-2 grid grid-cols-2 gap-[2px] h-[200px] sm:h-[300px]">
            <div className="bg-gray-300 dark:bg-main/50 w-full h-full" />
            <div className="bg-gray-300 dark:bg-main/50 w-full h-full" />
            <div className="bg-gray-300 dark:bg-main/50 w-full h-full" />
            <div className="bg-gray-300 dark:bg-main/50 w-full h-full" />
          </div>

          {/* Actions Skeleton */}
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 md:gap-12 text-gray-400 text-sm">
              <div className="w-12 md:w-16 h-4 bg-gray-300 dark:bg-main/50 rounded" />
              <div className="w-12 md:w-16 h-4 bg-gray-300 dark:bg-main/50 rounded" />
              <div className="w-12 md:w-16 h-4 bg-gray-300 dark:bg-main/50 rounded" />
            </div>
            <div className="flex gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 dark:bg-main/50 rounded" />
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 dark:bg-main/50 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
