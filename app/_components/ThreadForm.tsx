"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../_hooks/useToast";
import { Character } from "../_schemas/Character";
import { Thread, threadSchema } from "../_schemas/Thread";
import {
  actionReturnError,
  actionReturnSuccess,
  ActionResult,
} from "../_utils/action-return";
import CheckboxWithText from "./CheckboxWithText";
import DatePickerWithLabel from "./DatePickerWithLabel";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";

type Props = {
  thread?: Thread;
  characterId?: Character["id"];
  setOpen: (open: boolean) => void;
  action: (threadData: Thread, editId: number) => Promise<ActionResult>;
};

export function ThreadForm({ thread, characterId, setOpen, action }: Props) {
  const router = useRouter();

  const { id: threadId, ...values } = thread || {};

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: threadId
      ? "date" in values
        ? { ...values, date: toDate(values.date) }
        : { ...values }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full gap-8"
      >
        <DatePickerWithLabel
          fieldTitle="Date"
          nameInSchema="date"
          description="Click the input field to change the date."
        />

        <InputWithLabel
          fieldTitle="Type"
          nameInSchema="type"
          placeholder="Log, network, inbox, etc."
        />

        <TextareaWithLabel
          fieldTitle="Blurb"
          nameInSchema="blurb"
          placeholder="Maximum of 500 characters"
          maxLength={500}
        />

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
        <DialogFooter className="flex-col-reverse gap-4 pt-4">
          <DialogClose className="mr-auto border rounded px-4 py-2 text-sm sm:w-fit w-full bg-secondary hover:bg-accent/80 transition-colors">
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="sm:w-fit w-full"
          >
            {threadId ? "Save changes" : "Add thread"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
