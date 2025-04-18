import { addCharacter } from "@/app/_lib/apiCharacters";
import { NewCharacter } from "@/app/_schemas/Character";
import { RequestSuccess } from "@/app/_utils/action-return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

type AddCharacterParams = {
  characterData: Omit<NewCharacter, "userId">;
};

export function useAddCharacter(setOpen: (open: boolean) => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ characterData }: AddCharacterParams) =>
      addCharacter(characterData),

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

      setOpen(false);
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
