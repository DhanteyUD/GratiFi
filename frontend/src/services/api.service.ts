import axios from "axios";
import storageService from "@/services/storage.service";
import { showToastWarning } from "@/utils/notification.utils";
import { configKeys } from "@/config";

const axiosInstance = axios.create({
  baseURL: configKeys.apiURL,
  timeout: 50000,
});

const handleUnauthorizedAccess = (redirectTo: string) => {
  localStorage.clear();
  sessionStorage.clear();

  window.location.href = redirectTo;
};

axiosInstance.interceptors.request.use((config) => {
  const token = storageService.getToken("app_token");

  if (!token) {
    showToastWarning("Please login to continue", "top-center", 5000, true);
    handleUnauthorizedAccess("/");
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 || status === 403) {
      showToastWarning(message, "top-center", 5000, true);
      handleUnauthorizedAccess("/login");
    } else {
      console.error(
        "App Error (see: /src/services/api.service.ts)",
        error?.response || error
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
