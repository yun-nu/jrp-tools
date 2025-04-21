import { signOut } from "@/app/_lib/service-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useSignOut(
  push: (url: string) => void,
  setOpenMobile: (open: boolean) => void
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => signOut(),

    onSuccess: (result) => {
      queryClient.setQueryData(["user"], null);
      push("/");
      setOpenMobile(false);
      toast({
        description: result.success,
        variant: "success",
      });
      queryClient.clear();
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
