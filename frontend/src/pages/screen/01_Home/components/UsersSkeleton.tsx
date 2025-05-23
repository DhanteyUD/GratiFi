export default function UsersSkeleton() {
  return (
    <div className="flex flex-col items-start border border-gray-300 dark:border-main/50 p-4 rounded-xl bg-white/50 dark:bg-main/50 h-auto gap-2 animate-pulse">
      <h1 className="text-[20px] font-calSans font-[600] text-main dark:text-primary mb-2">
        Who to follow
      </h1>

      {[...Array(2)].map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center w-full p-2 rounded-md hover:bg-primaryHover/50 dark:hover:bg-main/50 cursor-wait"
        >
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-main/50" />

            {/* Name + Email */}
            <div className="flex flex-col leading-4 justify-center gap-1">
              <div className="flex items-center gap-2">
                <div className="w-24 h-4 bg-gray-300 dark:bg-main/50 rounded" />
                <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-main/50" />
              </div>
              <div className="w-32 h-3 bg-gray-300 dark:bg-main/50 rounded" />
            </div>
          </div>

          {/* Follow Button */}
          <div className="w-[80px] h-[32px] bg-gray-300 dark:bg-main/50 rounded-full" />
        </div>
      ))}
    </div>
  );
}
