import { useQuery } from "@tanstack/react-query";
import {
  fetchUserProfile,
  fetchAllUsers,
  fetchAllPosts,
  fetchMyPosts,
  fetchPostsByUserId,
} from "@/api";

function FetchUserProfile() {
  const { isPending: fetchingUserProfile, data: userProfile = {} } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    select: (data) => data?.data?.user,
  });

  return { fetchingUserProfile, userProfile };
}

function FetchAllUsers() {
  const { isPending: fetchingAllUsers, data: allUsers = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: fetchAllUsers,
    select: (data) => data?.data?.users,
  });

  return { fetchingAllUsers, allUsers };
}

function FetchAllPosts() {
  const { isPending: fetchingAllPosts, data: allPosts = [] } = useQuery({
    queryKey: ["all-posts"],
    queryFn: fetchAllPosts,
    select: (data) => data?.data?.posts,
  });

  return { fetchingAllPosts, allPosts };
}

function FetchMyPosts() {
  const { isPending: fetchingMyPosts, data: myPosts = [] } = useQuery({
    queryKey: ["my-posts"],
    queryFn: fetchMyPosts,
    select: (data) => data?.data?.posts,
  });

  return { fetchingMyPosts, myPosts };
}

function FetchPostsByUserId(userId: string) {
  const { isPending: fetchingPostsByUser, data: postsByUser = [] } = useQuery({
    queryKey: ["posts-by-user", userId],
    queryFn: () => fetchPostsByUserId(userId),
    select: (data) => data?.data?.posts,
  });

  return { fetchingPostsByUser, postsByUser };
}

export {
  FetchUserProfile,
  FetchAllUsers,
  FetchAllPosts,
  FetchMyPosts,
  FetchPostsByUserId,
};
