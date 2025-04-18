import { editCharacter as apiEditCharacter } from "@/app/_lib/service-characters";
import { ExistingCharacter } from "@/app/_schemas/Character";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useEditCharacter(setOpen: (open: boolean) => void) {
  const queryClient = useQueryClient();

  const { mutate: editCharacter, isPending: isEditing } = useMutation({
    mutationFn: ({ characterData }: { characterData: ExistingCharacter }) =>
      apiEditCharacter(characterData),

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

  return { editCharacter, isEditing };
}
