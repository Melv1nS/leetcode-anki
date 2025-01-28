export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8" />

          {/* Category Filter Skeleton */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
              />
            ))}
          </div>

          {/* Problem List Skeleton */}
          {[1, 2, 3].map((section) => (
            <div
              key={section}
              className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="px-6 py-4 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
