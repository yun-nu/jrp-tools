import { verifyOTPLogin } from "@/app/_lib/service-auth";
import { SignInOTP } from "@/app/_schemas/Auth";
import { RequestSuccess } from "@/app/_utils/return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../useToast";

export function useVerifyOTP() {
  const queryClient = useQueryClient();

  const { mutateAsync: verifyOTP, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, OTPCode }: SignInOTP) =>
      verifyOTPLogin({ email, OTPCode }),
    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        queryClient.setQueryData(["user"], result.user);

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
