import { ExistingCharacter } from "@/app/_schemas/Character";
import { RequestSuccess } from "@/app/_utils/action-return";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "../useToast";
import { deleteCharacter } from "@/app/_lib/apiCharacters";

type DeleteCharacterParams = {
  characterId: ExistingCharacter["id"];
};

export function useDeleteCharacter() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ characterId }: DeleteCharacterParams) =>
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
