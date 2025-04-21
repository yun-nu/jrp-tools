import { getCurrentUser } from "@/app/_lib/service-auth";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return {
    user,
    isLoading,
    error,
  };
}
