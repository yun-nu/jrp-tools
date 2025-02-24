"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/Form";
import TextareaWithLabel from "./TextareaWithLabel";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";

export function ContactForm() {
  const formSchema = z.object({
    name: z.string().optional(),
    message: z
      .string()
      .min(50, { message: "Message should be at least 50 characters long." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputWithLabel fieldTitle="Name" nameInSchema="name" />
        <TextareaWithLabel fieldTitle="Message" nameInSchema="message" />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
