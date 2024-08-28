import { Skeleton } from "../ui/skeleton";

const BlogSkeleton = () => {
  return (
    <div className="w-full max-w-[720px] flex flex-col gap-4 border-b-[1px] border-b-gray-300 p-5 font-serif">
      <div className="flex gap-3 items-center">
        <Skeleton className="h-6 w-6 bg-gray-200" />
        <div>
          <Skeleton className="h-4 w-20 bg-gray-200" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-full bg-gray-200" />
        <Skeleton className="h-6 w-full bg-gray-200" />
      </div>

      <div className="text-sm text-gray-600">
        <Skeleton className="h-4 w-20 bg-gray-200" />
      </div>
    </div>
  );
};

export default BlogSkeleton;
