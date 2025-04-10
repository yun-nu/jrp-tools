"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../_hooks/useToast";
import { FORM_CONTACT_MAX_LENGTH } from "../_lib/consts";
import {
  Character,
  ExistingCharacter,
  existingCharacterSchema,
  isExistingCharacter,
  NewCharacter,
  newCharacterSchema,
} from "../_schemas/Character";
import {
  actionReturnError,
  actionReturnSuccess,
} from "../_utils/action-return";
import {
  addCharacterAction,
  editCharacterAction,
  verifyDisplayNameAvailability,
} from "../account/actions-characters";
import CheckboxWithText from "./CheckboxWithText";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";

type CharacterFormProps = {
  setOpen: (open: boolean) => void;
  character?: Character;
  action: typeof addCharacterAction | typeof editCharacterAction;
};

export function CharacterForm({
  setOpen,
  character,
  action,
}: CharacterFormProps) {
  const [isValidDisplayName, setIsValidDisplayName] = useState(false);
  const { refresh } = useRouter();

  const isEditing = isExistingCharacter(character ?? ({} as Character));
  const characterSchema = isEditing
    ? existingCharacterSchema
    : newCharacterSchema;

  const form = useForm<Omit<NewCharacter, "userId">>({
    resolver: zodResolver(characterSchema.omit({ userId: true })),
    defaultValues: character ?? {
      displayName: "",
      characterName: "",
      blurb: "",
      acLink: "",
      gameName: "",
      journalLink: "",
      journalName: "",
      icon: "",
      isPublic: false,
      isActive: true,
    },
  });

  const onSubmit = async () => {
    let result;
    const values = form.getValues();

    if (isEditing && isExistingCharacter(character))
      result = await (action as typeof editCharacterAction)(
        values as ExistingCharacter
      );
    else
      result = await (action as typeof addCharacterAction)(
        values as NewCharacter
      );

    if (actionReturnError(result)) {
      toast({
        description: result.error || result.message,
        variant: "destructive",
      });
      return;
    }
    if (actionReturnSuccess(result)) {
      toast({ description: result.success, variant: "success" });
      form.reset();
      refresh();
      setOpen(false);
    }
  };

  const handleVerifyAvailability = async () => {
    const result = await verifyDisplayNameAvailability(
      form.getValues("displayName"),
      character?.displayName
    );
    if (result.taken) {
      setIsValidDisplayName(false);
      form.setError("displayName", {
        message: result.error,
      });
    }
    if (!result.taken) {
      setIsValidDisplayName(true);
      form.clearErrors("displayName");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full gap-8"
      >
        <InputWithLabel
          fieldTitle="Display Name"
          nameInSchema="displayName"
          description="Required. This is the unique username for your character. Can only contain alphanumeric characters and underscores."
          onBlur={handleVerifyAvailability}
        />
        <InputWithLabel
          fieldTitle="Character Name"
          nameInSchema="characterName"
          description="Required. This name will be displayed on your character list and page."
        />

        <InputWithLabel
          fieldTitle="Icon"
          nameInSchema="icon"
          placeholder="https://image.com/icon.jpg"
          description="Square icons that will be used alongside character name."
        />

        <TextareaWithLabel
          fieldTitle="Blurb"
          nameInSchema="blurb"
          maxLength={FORM_CONTACT_MAX_LENGTH}
        />

        <InputWithLabel fieldTitle="Game Name" nameInSchema="gameName" />

        <InputWithLabel fieldTitle="Journal" nameInSchema="journalName" />

        <InputWithLabel
          fieldTitle="Journal Link"
          nameInSchema="journalLink"
          description="Must start with http:// or https://"
        />

        <InputWithLabel
          fieldTitle="AC Link"
          nameInSchema="acLink"
          description="Must start with http:// or https://"
        />

        <CheckboxWithText
          nameInSchema="isPublic"
          fieldTitle="Make character profile public"
          description="Character profiles are private
  by default. If you'd like to share your character page, check this option."
        />

        <DialogFooter className="pt-4 gap-4">
          <DialogClose className="mr-auto border rounded px-4 py-2 text-sm sm:w-fit w-full bg-secondary hover:bg-accent/80 transition-colors">
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={!isValidDisplayName || form.formState.isSubmitting}
            className="sm:w-fit w-full"
          >
            {isEditing ? "Save changes" : "Add character"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
