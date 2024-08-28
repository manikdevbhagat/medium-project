import { CreateBlogInput, UpdateBlogInput } from "@manikdevbhagat/common";
import { securedAxios } from "@/utils/axiosConfig";

const blogService = {
  // Service for signing up a new user
  getAllBlogs: async (search: string) => {
    try {
      const response = await securedAxios.get(
        `/api/v1/blog/bulk?q=${search ?? ""}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Service for signing in an existing user
  getBlogDetails: async (id: string) => {
    try {
      const response = await securedAxios.get(`/api/v1/blog/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Service for creating a new blog
  createBlog: async (blog: CreateBlogInput) => {
    try {
      const response = await securedAxios.post(`/api/v1/blog`, blog);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Service for updating an existing blog
  updateBlog: async (id: string, blog: UpdateBlogInput) => {
    try {
      const response = await securedAxios.put(`/api/v1/blog/${id}`, blog);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default blogService;
