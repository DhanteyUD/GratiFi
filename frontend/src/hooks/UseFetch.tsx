import { fetchProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

function FetchUserProfile() {
  const { isPending: fetchingProfile, data: profile = {} } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    select: (data) => data?.data?.user,
  });

  return { fetchingProfile, profile };
}

export { FetchUserProfile };
