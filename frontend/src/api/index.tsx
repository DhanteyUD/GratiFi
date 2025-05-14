import axiosInstance from "@/services/api.service";

export const fetchProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response;
};