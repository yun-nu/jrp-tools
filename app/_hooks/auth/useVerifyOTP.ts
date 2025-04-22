import { verifyOTPLogin } from "@/app/_lib/service-auth";
import { SignInOTP } from "@/app/_schemas/Auth";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "../useToast";

export function useVerifyOTP(
  push: (href: string, options?: NavigateOptions) => void
) {
  const queryClient = useQueryClient();

  const { mutateAsync: verifyOTP, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, OTPCode }: SignInOTP) =>
      verifyOTPLogin({ email, OTPCode }),
    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        queryClient.setQueryData(["user"], result.user);
        push("/account/characters");

        toast({
          description: result.success,
          variant: "success",
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

  return { verifyOTP, isLoggingIn };
}
