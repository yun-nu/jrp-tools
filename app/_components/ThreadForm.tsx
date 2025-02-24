"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../_hooks/use-toast";
import { Character } from "../_schemas/Character";
import { Thread, threadSchema } from "../_schemas/Thread";
import {
  actionReturnError,
  actionReturnSuccess,
  CharacterActionResult,
} from "../_utils/actionReturn";
import CheckboxWithText from "./CheckboxWithText";
import DatePickerWithLabel from "./DatePickerWithLabel";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";

type Props = {
  thread: Thread;
  setOpen: (open: boolean) => void;
  action: (
    threadData: Thread,
    editId: number
  ) => Promise<CharacterActionResult>;
  characterId?: Character["id"];
};

export function ThreadForm({ thread, characterId, setOpen, action }: Props) {
  const router = useRouter();

  const { id: threadId, ...values } = thread || {};

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: threadId
      ? { ...values, date: toDate(values.date) }
      : {
          date: new Date(),
          type: "",
          blurb: "",
          url: "",
          isFinished: false,
        },
  });

  const onSubmit = async () => {
    let result;
    if (threadId) result = await action(form.getValues(), threadId);
    else result = await action(form.getValues(), characterId as number);

    if (actionReturnError(result)) {
      toast({
        description: result.error || result.message,
        variant: "destructive",
      });
      return;
    }
    if (actionReturnSuccess(result)) {
      toast({ description: result.success, className: "bg-green-700" });
      form.reset();
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DatePickerWithLabel
          fieldTitle="Date"
          nameInSchema="date"
          description="Required. Use the calendar to choose a date."
        />

        <InputWithLabel
          fieldTitle="Type"
          nameInSchema="type"
          placeholder="Log, network, inbox, etc."
        />

        <TextareaWithLabel fieldTitle="Blurb" nameInSchema="blurb" />

        <InputWithLabel
          fieldTitle="Thread Link"
          nameInSchema="url"
          placeholder="Must start with http:// or https://"
        />

        <CheckboxWithText
          nameInSchema="isFinished"
          fieldTitle="Mark this thread as finished"
          description={`Threads are marked as ongoing by default. Check this option if ${
            threadId
              ? "you'd like to mark this thread as finished"
              : "you're adding an already finished thread"
          }.`}
        />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button type="submit">
            {threadId ? "Save changes" : "Add thread"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
