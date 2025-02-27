"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { TbPasswordUser, TbUserEdit } from "react-icons/tb";
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
import { signInGoogleAction } from "../login/actions";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";

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
  const [errors, setErrors] = useState({});
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
      setErrors(result.errors);
      return;
    }
    if (actionReturnSuccess(result)) {
      setMessage(result.success);
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

          {message ? <p className="text-base">{message}</p> : null}

          {errors ? (
            <div className="mb-10 text-red-500">
              {Object.keys(errors).map((key) => (
                <p key={key}>{`${key}: ${
                  errors[key as keyof typeof errors]
                }`}</p>
              ))}
            </div>
          ) : null}

          <Button type="submit" className="w-full">
            {isUpdate ? <TbUserEdit /> : <TbPasswordUser />} {btnDescription}
          </Button>
        </form>
      </Form>
    </>
  );
}
