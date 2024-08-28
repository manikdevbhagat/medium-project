import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useFullBlog from "@/hooks/useFullBlog";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { loading, blog } = useFullBlog(id as string);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-10 items-center p-5">
        <div className="w-full max-w-[720px] p-4 flex flex-col gap-4">
          <Skeleton className="h-20 w-full bg-gray-200" />
          <div className="flex flex-col gap-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="flex flex-col gap-2">
                <Skeleton key={index} className="h-4 w-full bg-gray-200" />
                <Skeleton key={index} className="h-4 w-full bg-gray-200" />
                <Skeleton key={index} className="h-4 w-full bg-gray-200" />
                <Skeleton key={index} className="h-4 w-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 items-center p-5">
      <div className="w-full max-w-[720px] p-4 flex flex-col gap-4">
        <h1 className="w-full  text-[48px] font-serif outline-none bg-transparent leading-snug">
          {blog?.title}
        </h1>
        <div className="flex gap-4 items-center">
          <Avatar className="h-12 w-12 bg-gray-200 p-1">
            <AvatarImage
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>{blog?.author.name.length ? blog.author.name : "Anonymous"}</div>
        </div>
        <span
          style={{ whiteSpace: "pre-line" }}
          className="mt-4 w-full text-xl font-serif outline-none bg-transparent"
        >
          {blog?.content}
        </span>
      </div>
    </div>
  );
};

export default BlogDetails;
