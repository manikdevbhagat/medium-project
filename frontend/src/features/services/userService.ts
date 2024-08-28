import { UpdateUserInput } from "@manikdevbhagat/common";
import { securedAxios } from "@/utils/axiosConfig";

const userService = {
  // Service for signing up a new user
  getUserProfile: async () => {
    try {
      const response = await securedAxios.get(`/api/v1/user`);
      return response.data;
    } catch (error) {
      // Handle errors (e.g., display error message)
      throw error;
    }
  },

  // Service for signing in an existing user
  editUserProfile: async (userData: UpdateUserInput) => {
    try {
      const response = await securedAxios.put(`/api/v1/user`, userData);
      return response.data;
    } catch (error) {
      // Handle errors (e.g., display error message)
      throw error;
    }
  },
};

export default userService;
