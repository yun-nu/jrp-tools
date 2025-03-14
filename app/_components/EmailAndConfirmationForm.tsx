"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbPasswordUser, TbStatusChange, TbUserEdit } from "react-icons/tb";
import { z } from "zod";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "../_schemas/Auth";
import {
  ActionResult,
  actionReturnError,
  actionReturnSuccess,
} from "../_utils/action-return";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";
import { FaUserEdit } from "react-icons/fa";

type EmailAndConfirmationProps = {
  btnDescription: string;
  isUpdate?: boolean;
  action: ({
    email,
    emailConfirmation,
  }: EmailAndConfirmation) => Promise<ActionResult>;
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
    if (actionReturnError(result)) {
      setMessage(result.message);
      setError(result.errors || result.error);
      return;
    }
    if (actionReturnSuccess(result)) {
      setMessage(result.success);
      setError("");
      router.refresh();
      form.reset(form.getValues());
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <Button type="submit">{btnDescription}</Button>
        </form>
      </Form>
    </>
  );
}
