import { getCharacters } from "@/app/_lib/apiCharacters";
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
    queryFn: () => getCharacters(userId),
    enabled: !!userId,
  });

  return { isLoading, characters, error };
}
