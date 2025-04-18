"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUpOTP } from "../_hooks/useSignupOTP";
import { useUpdateEmail } from "../_hooks/useUpdateEmail";
import { emailAndConfirmationSchema } from "../_schemas/Auth";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";

type EmailAndConfirmationProps = {
  btnDescription: string;
  isUpdate?: boolean;
};

export function EmailAndConfirmationForm({
  btnDescription,
  isUpdate,
}: EmailAndConfirmationProps) {
  const form = useForm<z.infer<typeof emailAndConfirmationSchema>>({
    resolver: zodResolver(emailAndConfirmationSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
    },
  });

  const { mutate: signUpOtp } = useSignUpOTP(form.reset);
  const { mutate: updateEmail } = useUpdateEmail(form.reset);

  const onSubmit = () => {
    if (isUpdate) updateEmail({ input: form.getValues() });
    else signUpOtp({ input: form.getValues() });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <InputWithLabel
            fieldTitle={isUpdate ? "New Email" : "Email"}
            nameInSchema="email"
          />
          <InputWithLabel
            fieldTitle={isUpdate ? "Confirm new Email" : "Confirm Email"}
            nameInSchema="emailConfirmation"
          />

          <Button type="submit" className={`${isUpdate && "sm:w-fit"}`}>
            {btnDescription}
          </Button>
        </form>
      </Form>
    </>
  );
}
