import { getCharacters } from "@/app/_lib/service-characters";
import { ExistingCharacter } from "@/app/_schemas/Character";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useCharacters(userId: User["id"]) {
  const {
    isLoading,
    data: characters,
    error,
  } = useQuery<ExistingCharacter[] | Error>({
    queryKey: ["characters", userId],
    queryFn: () => {
      return getCharacters(userId);
    },
    enabled: !!userId,
  });

  return { isLoading, characters, error };
}
