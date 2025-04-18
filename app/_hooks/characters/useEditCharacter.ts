import { editCharacter } from "@/app/_lib/apiCharacters";
import { ExistingCharacter } from "@/app/_schemas/Character";
import { RequestSuccess } from "@/app/_utils/action-return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

type EditCharacterParams = {
  characterData: ExistingCharacter;
};

export function useEditCharacter(setOpen: (open: boolean) => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ characterData }: EditCharacterParams) =>
      editCharacter(characterData),

    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        toast({
          description: result.success,
          variant: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["characters"],
        });

        setOpen(false);
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
