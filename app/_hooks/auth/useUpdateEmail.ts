import { useMutation } from "@tanstack/react-query";
import { updateEmail as apiUpdateEmail } from "../../_lib/service-auth";
import { EmailAndConfirmation } from "../../_schemas/Auth";
import { RequestSuccess } from "../../_utils/return";
import { toast } from "../useToast";

export function useUpdateEmail(reset: () => void) {
  const { mutate: updateEmail, isPending: isUpdating } = useMutation({
    mutationFn: ({ input }: { input: EmailAndConfirmation }) =>
      apiUpdateEmail(input),

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

  return { updateEmail, isUpdating };
}
