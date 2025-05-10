import { showToastWarning } from "../utils/notification.utils";
import axios from "axios";
import storageService from "./storage.service";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = storageService.getToken();
  if (!token) {
    showToastWarning("Please login to continue");
    window.location.href = "/";
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      error?.response?.data === "Invalid token"
    ) {
      storageService.removeToken();
      window.location.href = "/";
    } else {
      console.error("App Error:", error?.response);
    }
    throw error;
  }
);

export default axiosInstance;
