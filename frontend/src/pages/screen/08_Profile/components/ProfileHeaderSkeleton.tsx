function ProfileHeaderSkeleton() {
  return (
    <div className="w-full mx-auto animate-pulse">
      <div className="h-48 bg-gray-300  dark:bg-main/50 relative">
        <div className="w-full h-full object-cover bg-gray-400  dark:bg-main/50"></div>
        <div className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4 bg-gray-400  dark:bg-main"></div>
        <div className="absolute right-5 -bottom-14 px-5 py-2 rounded-full bg-gray-300  dark:bg-main/50 w-28 h-8"></div>
      </div>

      <div className="mt-12 p-4 space-y-2">
        <div className="h-6 bg-gray-300  dark:bg-main/60 rounded w-1/3" />
        <div className="h-4 bg-gray-200  dark:bg-main/50 rounded w-1/4" />
        <div className="h-4 bg-gray-200  dark:bg-main/50 rounded w-3/5 mt-4" />
        <div className="flex gap-4 mt-2">
          <div className="h-4 bg-gray-200  dark:bg-main/50 rounded w-1/4" />
          <div className="h-4 bg-gray-200  dark:bg-main/50 rounded w-1/4" />
        </div>
        <div className="flex gap-4 mt-2">
          <div className="h-4 bg-gray-200  dark:bg-main/50 rounded w-1/6" />
          <div className="h-4 bg-gray-200  dark:bg-main/50 rounded w-1/6" />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderSkeleton;
