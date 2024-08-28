import { SignupInput, SigninInput } from "@manikdevbhagat/common";
import { publicAxios } from "@/utils/axiosConfig";

const authService = {
  // Service for signing up a new user
  signUp: async (userData: SignupInput) => {
    try {
      const response = await publicAxios.post(`/api/v1/auth/signup`, userData);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      window.dispatchEvent(new Event("storage"));
      return response.data;
    } catch (error) {
      // Handle errors (e.g., display error message)
      throw error;
    }
  },

  // Service for signing in an existing user
  signIn: async (credentials: SigninInput) => {
    try {
      const response = await publicAxios.post(
        `/api/v1/auth/signin`,
        credentials
      );
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      window.dispatchEvent(new Event("storage"));
      return response.data;
    } catch (error) {
      // Handle errors (e.g., display error message)
      throw error;
    }
  },
};

export default authService;
