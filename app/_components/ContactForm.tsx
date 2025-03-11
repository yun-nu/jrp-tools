"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactFormAction } from "../_lib/contact";
import { formSchema } from "../_schemas/Auth";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";
import { toast } from "../_hooks/useToast";

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
      toast({ description: "Message sent successfully" });
      form.reset();
    }

    if (result.error)
      toast({ description: result.error, variant: "destructive" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputWithLabel
          fieldTitle="Name"
          nameInSchema="name"
          placeholder="Optional"
        />
        <TextareaWithLabel
          fieldTitle="Message"
          nameInSchema="message"
          maxLength={2000}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
