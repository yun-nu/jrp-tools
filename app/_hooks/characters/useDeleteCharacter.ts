import { deleteCharacter } from "@/app/_lib/service-characters";
import { ExistingCharacter } from "@/app/_schemas/Character";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useDeleteCharacter() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ characterId }: { characterId: ExistingCharacter["id"] }) =>
      deleteCharacter(characterId),

    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        toast({
          description: result.success,
          variant: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["characters"],
        });
      }
    },

    onError: (err) => {
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
}
