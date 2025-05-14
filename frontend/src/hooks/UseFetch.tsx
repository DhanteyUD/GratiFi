import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile, fetchAllPosts } from "@/api";

function FetchUserProfile() {
  const { isPending: fetchingUserProfile, data: userProfile = {} } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    select: (data) => data?.data?.user,
  });

  return { fetchingUserProfile, userProfile };
}

function FetchAllPosts() {
  const { isPending: fetchingAllPosts, data: allPosts = [] } = useQuery({
    queryKey: ["all-posts"],
    queryFn: fetchAllPosts,
    select: (data) => data?.data?.posts,
  });

  return { fetchingAllPosts, allPosts };
}

export { FetchUserProfile, FetchAllPosts };
