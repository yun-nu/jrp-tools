import { useMutation } from "@tanstack/react-query";
import { updateEmail } from "../_lib/service-auth";
import { EmailAndConfirmation } from "../_schemas/Auth";
import { RequestSuccess } from "../_utils/return";
import { toast } from "./useToast";

export function useUpdateEmail(reset: () => void) {
  const mutation = useMutation({
    mutationFn: ({ input }: { input: EmailAndConfirmation }) =>
      updateEmail(input),

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
