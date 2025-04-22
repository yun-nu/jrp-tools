import { toggleUsedForAc as apiToggleUsedForAc } from "@/app/_lib/service-threads";
import { ExistingThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

type ToggleUsedForAcParams = {
  threadId: ExistingThread["id"];
  updatedState: ExistingThread["usedForAc"];
};

export function useToggleUsedForAc() {
  const queryClient = useQueryClient();

  const { mutate: toggleUsedForAc } = useMutation({
    mutationFn: ({ threadId, updatedState }: ToggleUsedForAcParams) => {
      return apiToggleUsedForAc(threadId, updatedState);
    },

    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        toast({
          description: result.success,
          variant: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["threads"],
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

  return { toggleUsedForAc };
}
