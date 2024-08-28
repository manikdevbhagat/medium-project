import blogService from "@/features/services/blogService";
import { Blog } from "@/models/interfaces";
import { useState, useEffect } from "react";

const useFullBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogDetails(id);
        setBlog(data.blog);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { loading, blog };
};

export default useFullBlog;
