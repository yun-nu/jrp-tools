import { useMutation } from "@tanstack/react-query";
import { signUpOTP } from "../_lib/service-auth";
import { EmailAndConfirmation } from "../_schemas/Auth";
import { RequestSuccess } from "../_utils/return";
import { toast } from "./useToast";

export function useSignUpOTP(reset: () => void) {
  const mutation = useMutation({
    mutationFn: ({ input }: { input: EmailAndConfirmation }) =>
      signUpOTP(input),

    onSuccess: (result) => {
      if (RequestSuccess(result)) {
        toast({
          title: `${result.email}`,
          description: result.success,
          variant: "success",
        });
        reset();
      }
    },

    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
}
