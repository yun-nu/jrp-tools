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
    message: z.string().min(1, { message: "Message can't be empty" }),
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
      <div>
        <h2 className="text-2xl">Suggestion box</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputWithLabel
            fieldTitle="Name"
            nameInSchema="name"
            placeholder="Optional"
          />
          <TextareaWithLabel fieldTitle="Message" nameInSchema="message" />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </Form>
  );
}
