import { toggleThreadStatus as apiToggleThreadStatus } from "@/app/_lib/service-threads";
import { ExistingThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useToggleThreadStatus() {
  const queryClient = useQueryClient();

  const { mutate: toggleThreadStatus, isPending: isToggling } = useMutation({
    mutationFn: ({ thread, drop }: { thread: ExistingThread; drop: boolean }) =>
      apiToggleThreadStatus(thread, drop),

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

  return { toggleThreadStatus, isToggling };
}
