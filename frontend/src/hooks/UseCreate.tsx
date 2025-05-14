import axiosInstance from "@/services/api.service";
import { showToastError } from "@/utils/notification.utils";
import { AxiosError } from "axios";

const createPost = async ({
  text,
  media,
  audience,
  schedule,
}: {
  text: string;
  media: File[];
  audience: string;
  schedule: Date | null;
}) => {
  try {
    const formData = new FormData();

    formData.append("audience", audience);
    formData.append("text", text);
    media.forEach((file) => {
      formData.append("media", file);
    });
    if (schedule) {
      formData.append("scheduledAt", schedule.toISOString());
    }

    const response = await axiosInstance.post("/api/posts", formData);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message || "Failed to create post";

    console.error("Failed to create post:", error);
    showToastError(message, "top-center", 5000, true);
  }
};

export { createPost };
