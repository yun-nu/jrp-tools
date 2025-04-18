import { toggleThreadFinished } from "@/app/_lib/service-threads";
import { ExistingThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useToggleThreadFinished() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ thread }: { thread: ExistingThread }) =>
      toggleThreadFinished(thread),

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

  return mutation;
}
