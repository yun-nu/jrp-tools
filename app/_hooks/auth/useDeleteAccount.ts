import { deleteAccountAction } from "@/app/account/settings/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "../useToast";

export function useDeleteAccount(
  push: (href: string, options?: NavigateOptions) => void
) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteAccountAction(),
    onSuccess: (result) => {
      queryClient.clear();
      push("/");
      toast({
        title: `Bye bye! 👋`,
        description: result.success,
        variant: "success",
      });
    },
    onError: (err) => {
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return { deleteAccount, isDeleting };
}
