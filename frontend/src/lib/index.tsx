import { fetchProfile } from "@/api";
import {
  useQuery,
  // useMutation,
  // useQueryClient
} from "@tanstack/react-query";

export function FetchProfile() {
  const { isPending: fetchingProfile, data: profile = {} } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    select: (data) => data?.data?.user,
  });

  return { fetchingProfile, profile };
}
