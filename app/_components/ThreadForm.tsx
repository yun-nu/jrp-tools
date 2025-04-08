"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../_hooks/useToast";
import { ExistingCharacter } from "../_schemas/Character";
import {
  ExistingThread,
  existingThreadSchema,
  isExistingThread,
  NewThread,
  newThreadSchema,
  Thread,
} from "../_schemas/Thread";
import {
  actionReturnError,
  actionReturnSuccess,
} from "../_utils/action-return";
import { addThreadAction, editThreadAction } from "../account/actions-threads";
import CheckboxWithText from "./CheckboxWithText";
import DatePickerWithLabel from "./DatePickerWithLabel";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";
import { toDate } from "date-fns";

type ThreadFormProps = {
  thread?: Thread;
  characterId?: ExistingCharacter["id"];
  setOpen: (open: boolean) => void;
  action: typeof addThreadAction | typeof editThreadAction;
};

export function ThreadForm({
  thread,
  characterId,
  setOpen,
  action,
}: ThreadFormProps) {
  const router = useRouter();

  const isEditing = isExistingThread(thread ?? ({} as Thread));
  const threadSchema = isEditing ? existingThreadSchema : newThreadSchema;

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: thread
      ? { ...thread, date: toDate(thread.date) }
      : {
          date: new Date(),
          type: "",
          blurb: "",
          url: "",
          isFinished: false,
          characterId: characterId,
        },
  });

  const onSubmit = async () => {
    let result;
    const values = form.getValues();

    if (isEditing && isExistingThread(thread))
      result = await (action as typeof editThreadAction)(
        values as ExistingThread,
        thread.id
      );
    else result = await (action as typeof addThreadAction)(values as NewThread);

    if (actionReturnError(result))
      toast({
        description: result.error || result.message,
        variant: "destructive",
      });

    if (actionReturnSuccess(result)) {
      toast({ description: result.success, variant: "success" });
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
            isEditing
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
            {isEditing ? "Save changes" : "Add thread"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
