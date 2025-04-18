import { updateCommentCount } from "@/app/_lib/apiThreads";
import { ExistingThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/action-return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

type UpdateCommentCountParams = {
  threadId: number;
  updatedCount: ExistingThread["commentCount"];
};

export function useUpdateCommentCount() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ threadId, updatedCount }: UpdateCommentCountParams) =>
      updateCommentCount(threadId, updatedCount),
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
