import { duplicateThread as apiDuplicateThread } from "@/app/_lib/service-threads";
import { ExistingThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useDuplicateThread() {
  const queryClient = useQueryClient();

  const { mutate: duplicateThread, isPending: isDuplicating } = useMutation({
    mutationFn: ({ thread }: { thread: ExistingThread }) =>
      apiDuplicateThread(thread),

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

  return { duplicateThread, isDuplicating };
}
