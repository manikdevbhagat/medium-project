import BlogCard from "@/components/home/BlogCard";
import BlogSkeleton from "@/components/home/BlogSkeleton";
import useBlogs from "@/hooks/useBlogs";

const Homepage = () => {
  const { blogs, loading } = useBlogs();
  return (
    <div className="w-full p-5 flex flex-col items-center">
      {loading &&
        Array.from({ length: 5 }).map((_, i) => <BlogSkeleton key={i} />)}
      {blogs.map((blog) => (
        <BlogCard key={blog.title} blog={blog} />
      ))}
    </div>
  );
};

export default Homepage;
