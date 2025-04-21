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
      toast({
        description: result.success,
        variant: "success",
      });
      push("/");
      setOpenMobile(false);
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
