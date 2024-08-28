import axios, { AxiosInstance } from "axios";

// Get the base URL from the Vite environment file
const baseURL = import.meta.env.VITE_BACKEND_URL as string;

// Create the public axios instance
export const publicAxios: AxiosInstance = axios.create({
  baseURL,
});

// Create the secured axios instance
export const securedAxios: AxiosInstance = axios.create({
  baseURL,
});

// Add an interceptor to the secured axios instance to set the Bearer Token from local storage
securedAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
