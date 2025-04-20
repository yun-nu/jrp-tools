import { signOut } from "@/app/_lib/service-auth";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useSignOut(
  push: (url: string) => void,
  setOpenMobile: (open: boolean) => void
) {
  const mutation = useMutation({
    mutationFn: () => signOut(),

    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        toast({
          description: result.success,
          variant: "success",
        });
      }
      push("/");
      setOpenMobile(false);
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
