import axiosInstance from "@/services/api.service";

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response;
};

export const fetchAllUsers = async () => {
  const response = await axiosInstance.get("/user/users");
  return response;
};

export const fetchAllPosts = async () => {
  const response = await axiosInstance.get("/post/posts");
  return response;
};