"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toDate } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddThread } from "../_hooks/threads/useAddThread";
import { useEditThread } from "../_hooks/threads/useEditThread";
import { ExistingCharacter } from "../_schemas/Character";
import {
  ExistingThread,
  existingThreadSchema,
  isExistingThread,
  newThreadSchema,
  Thread,
} from "../_schemas/Thread";
import { FORM_BLURB_MAX_LENGTH } from "../_utils/consts";
import DatePickerWithLabel from "./DatePickerWithLabel";
import { InputWithLabel } from "./InputWithLabel";
import SelectWithText from "./SelectWithText";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";

type ThreadFormProps = {
  thread?: Thread;
  characterId?: ExistingCharacter["id"];
  setOpen: (open: boolean) => void;
};

export function ThreadForm({ thread, characterId, setOpen }: ThreadFormProps) {
  const { addThread, isAdding } = useAddThread(setOpen);
  const { editThread, isEditing } = useEditThread(setOpen);

  const isEditAction = isExistingThread(thread ?? ({} as Thread));
  const threadSchema = isEditAction ? existingThreadSchema : newThreadSchema;

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: thread
      ? { ...thread, date: toDate(thread.date) }
      : {
          date: new Date(),
          type: "",
          blurb: "",
          url: "",
          status: "ongoing",
          characterId: characterId,
          commentCount: 0,
          threadPartner: "",
          usedForAc: false,
        },
  });

  const onSubmit = () => {
    const values = form.getValues();

    if (isEditAction && isExistingThread(thread))
      editThread({ thread: values as ExistingThread });
    if (!isEditAction) addThread({ threadData: values });
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
          placeholder={`Maximum of ${FORM_BLURB_MAX_LENGTH} characters`}
          maxLength={FORM_BLURB_MAX_LENGTH}
        />

        <InputWithLabel
          fieldTitle="Thread Link"
          nameInSchema="url"
          placeholder="Must start with http:// or https://"
        />

        <InputWithLabel
          fieldTitle="Comment count"
          nameInSchema="commentCount"
          placeholder="0"
          type="number"
        />

        <InputWithLabel
          fieldTitle="Character(s)"
          nameInSchema="threadPartner"
          placeholder="Thread partner(s)"
        />

        <SelectWithText
          fieldTitle="Thread status"
          nameInSchema="status"
          description="Thread status can also be changed from the action menu on the table."
        />

        <DialogFooter className="flex-col-reverse gap-4 pt-4">
          <DialogClose className="mr-auto border rounded px-4 py-2 text-sm sm:w-fit w-full bg-secondary hover:bg-accent/80 transition-colors">
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={isAdding || isEditing}
            className="sm:w-fit w-full"
          >
            {isEditAction ? "Save changes" : "Add thread"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
