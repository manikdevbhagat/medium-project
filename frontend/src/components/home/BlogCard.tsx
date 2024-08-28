import { Blog } from "@/models/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the blog details page
    navigate(`/blog/${blog.id}`);
  };
  return (
    <div className="w-full max-w-[720px] flex flex-col gap-4 border-b-[1px] border-b-gray-300 p-5 font-serif">
      <div className="flex gap-3 items-center">
        {/* Placeholder for avatar - could be replaced with an actual image */}
        <Avatar className="h-8 w-8 bg-gray-200 p-1">
          <AvatarImage
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>{blog.author.name.length ? blog.author.name : "Anonymous"}</div>
      </div>
      <div className="flex flex-col gap-1 cursor-pointer" onClick={handleClick}>
        <h2 className="text-2xl font-semibold">{blog.title}</h2>
        <p className=" text-gray-600 text-base line-clamp-2">{blog.content}</p>
      </div>

      <div className="text-sm text-gray-600">
        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
};

export default BlogCard;
