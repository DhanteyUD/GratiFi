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

export const fetchMyPosts = async () => {
  const response = await axiosInstance.get("/post/posts/me");
  return response;
};

export const fetchPostsByUserId = async (userId: string) => {
  const response = await axiosInstance.get(`/post/posts/user/${userId}`);
  return response;
};

export const deletePost = async (postId: string) => {
  const response = await axiosInstance.delete(`/post/posts/${postId}`);
  return response;
}