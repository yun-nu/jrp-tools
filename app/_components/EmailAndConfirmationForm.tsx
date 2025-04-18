"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailAndConfirmationSchema } from "../_schemas/Auth";
import { RequestError, RequestSuccess } from "../_utils/action-return";
import { updateEmailAction } from "../account/settings/actions";
import { signUpOTPAction } from "../signup/actions";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";

type EmailAndConfirmationProps = {
  btnDescription: string;
  isUpdate?: boolean;
  action: typeof signUpOTPAction | typeof updateEmailAction;
};

export function EmailAndConfirmationForm({
  btnDescription,
  isUpdate,
  action,
}: EmailAndConfirmationProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof emailAndConfirmationSchema>>({
    resolver: zodResolver(emailAndConfirmationSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
    },
  });

  const onSubmit = async () => {
    const result = await action(form.getValues());

    if (RequestError(result)) {
      setMessage(result.message);
      setError(result.errors || result.error);
      return;
    }
    if (RequestSuccess(result)) {
      setMessage(result.success);
      setError("");
      router.refresh();
      form.reset(form.getValues());
    }
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

          {message ? <p className="text-sm">{message}</p> : null}

          {error ? <p className="mb-10 text-red-500 text-sm">{error}</p> : null}

          <Button type="submit" className={`${isUpdate && "sm:w-fit"}`}>
            {btnDescription}
          </Button>
        </form>
      </Form>
    </>
  );
}
