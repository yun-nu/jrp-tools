import { getThreads } from "@/app/_lib/service-threads";
import { ExistingCharacter } from "@/app/_schemas/Character";
import { ExistingThread } from "@/app/_schemas/Thread";
import { useQuery } from "@tanstack/react-query";

export function useThreads(characterId: ExistingCharacter["id"]) {
  const {
    isLoading,
    data: threads,
    error,
  } = useQuery<ExistingThread[] | Error>({
    queryKey: ["threads", characterId],
    queryFn: () => getThreads(characterId),
    enabled: !!characterId,
  });

  return { isLoading, threads, error };
}
