import { updateTotalCommentCount } from "@/app/_lib/service-threads";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";
import { UpdateCommentCountParams } from "./useUpdateCurrentCommentCount";

export function useUpdateTotalCommentCount() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ threadId, updatedCount }: UpdateCommentCountParams) =>
      updateTotalCommentCount(threadId, updatedCount),
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
