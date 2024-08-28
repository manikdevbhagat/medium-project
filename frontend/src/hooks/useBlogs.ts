import blogService from "@/features/services/blogService";
import { Blog } from "@/models/interfaces";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useDebounce from "./useDebounce";

const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const searchParam = useDebounce(
    new URLSearchParams(location.search).get("search") || "",
    500
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Make an API call to fetch blogs with the debounced search parameter
        const data = await blogService.getAllBlogs(searchParam);
        setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchParam]);

  return { blogs, loading };
};

export default useBlogs;
