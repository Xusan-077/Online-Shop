export default function ProductCardSkeleton() {
  return (
    <li className="bg-white rounded-lg overflow-hidden shadow-sm duration-300 flex flex-col animate-pulse">
      <div className="relative w-full h-56 overflow-hidden">
        <div className="flex justify-center items-center h-full bg-gray-200">

        </div>
        <span className="absolute bottom-2 left-4 h-4 w-16 bg-gray-300 rounded"></span>
      </div>

      <div className="flex flex-col p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>

        <div className="flex justify-between items-center mt-2">
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-9 bg-gray-300 rounded-lg mt-3"></div>
      </div>
    </li>
  );
}
