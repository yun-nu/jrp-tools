import { addCharacter as apiAddCharacter } from "@/app/_lib/service-characters";
import { NewCharacter } from "@/app/_schemas/Character";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useAddCharacter(setOpen: (open: boolean) => void) {
  const queryClient = useQueryClient();

  const { mutate: addCharacter, isPending: isAdding } = useMutation({
    mutationFn: ({
      characterData,
    }: {
      characterData: Omit<NewCharacter, "userId">;
    }) => apiAddCharacter(characterData),

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

  return { addCharacter, isAdding };
}
