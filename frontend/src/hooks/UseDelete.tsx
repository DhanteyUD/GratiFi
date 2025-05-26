import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "@/api";
import { showToastInfo } from "@/utils/notification.utils";

function DeletePost(postId: string) {
  const queryClient = useQueryClient();

  const { mutate: deletePostMutate, isPending: deletingPost } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      showToastInfo(data?.data?.message, "bottom-center", 3000, true);
    },
    onError: (error) => {
      console.error(`Error deleting post ${postId}:`, error);
    },
  });

  return { deletePostMutate, deletingPost };
}

export { DeletePost };
