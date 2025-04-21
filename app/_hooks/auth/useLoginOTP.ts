import { useMutation } from "@tanstack/react-query";
import { toast } from "../useToast";
import { SignInOTP } from "@/app/_schemas/Auth";
import { LoginOTP } from "@/app/_lib/service-auth";

export function useLoginOTP() {
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email }: Pick<SignInOTP, "email">) => LoginOTP({ email }),
    onError: (err) => {
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return { login, isLoggingIn };
}
