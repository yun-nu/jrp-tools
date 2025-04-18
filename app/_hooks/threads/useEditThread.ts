import { editThread as apiEditThread } from "@/app/_lib/service-threads";
import { ExistingThread } from "@/app/_schemas/Thread";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useEditThread(setOpen: (open: boolean) => void) {
  const queryClient = useQueryClient();

  const { mutate: editThread, isPending: isEditing } = useMutation({
    mutationFn: ({ thread }: { thread: ExistingThread }) =>
      apiEditThread(thread),
    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        toast({
          description: result.success,
          variant: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["threads"],
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

  return { editThread, isEditing };
}
