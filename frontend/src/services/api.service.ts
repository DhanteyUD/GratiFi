import { showToastWarning } from "@/utils/notification.utils";
import { configKeys } from "@/config";
import axios from "axios";
import storageService from "@/services/storage.service";

const axiosInstance = axios.create({
  baseURL: configKeys.apiURL,
  timeout: 50000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = storageService.getToken("app_token");

  if (!token) {
    showToastWarning("Please login to continue");
    localStorage.clear();
    sessionStorage.clear();

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
      error?.response?.data?.message === "Invalid token"
    ) {
      storageService.removeToken();

      window.location.href = "/login";
    } else {
      console.error(
        "App Error (see: /src/services/api.service.ts)",
        error?.response
      );
    }
    throw error;
  }
);

export default axiosInstance;
