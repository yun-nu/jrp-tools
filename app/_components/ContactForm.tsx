"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../_hooks/useToast";
import { formSchema } from "../_schemas/Auth";
import { FORM_CONTACT_MAX_LENGTH } from "../_utils/consts";
import { contactFormAction } from "../account/contact/actions";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    const result = await contactFormAction(form.getValues());
    if (result.messageId) {
      toast({ description: "Message sent successfully", variant: "success" });
      form.reset();
    }

    if (result.error)
      toast({ description: result.error, variant: "destructive" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-8 flex flex-col"
      >
        <InputWithLabel
          fieldTitle="Name"
          nameInSchema="name"
          placeholder="Optional"
        />
        <TextareaWithLabel
          fieldTitle="Message"
          nameInSchema="message"
          maxLength={FORM_CONTACT_MAX_LENGTH}
          className="max-w-full"
        />
        <Button
          type="submit"
          className="w-full sm:w-fit self-end"
          disabled={form.formState.isSubmitting}
        >
          Send message
        </Button>
      </form>
    </Form>
  );
}
