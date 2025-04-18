import { addThread as apiAddthread } from "@/app/_lib/service-threads";
import { NewThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useAddThread(setOpen: (open: boolean) => void) {
  const queryClient = useQueryClient();

  const { mutate: addThread, isPending: isAdding } = useMutation({
    mutationFn: ({ threadData }: { threadData: NewThread }) =>
      apiAddthread(threadData),

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
      setOpen(false);
    },

    onError: (err) => {
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return { addThread, isAdding };
}
