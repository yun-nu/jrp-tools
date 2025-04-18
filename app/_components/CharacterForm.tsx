"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddCharacter } from "../_hooks/characters/useAddCharacter";
import { useEditCharacter } from "../_hooks/characters/useEditCharacter";
import { FORM_BLURB_MAX_LENGTH } from "../_utils/consts";
import {
  Character,
  ExistingCharacter,
  existingCharacterSchema,
  isExistingCharacter,
  NewCharacter,
  newCharacterSchema,
} from "../_schemas/Character";

import CheckboxWithText from "./CheckboxWithText";
import { InputWithLabel } from "./InputWithLabel";
import TextareaWithLabel from "./TextareaWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";

type CharacterFormProps = {
  setOpen: (open: boolean) => void;
  character?: Character;
};

export function CharacterForm({ setOpen, character }: CharacterFormProps) {
  const { addCharacter, isAdding } = useAddCharacter(setOpen);
  const { editCharacter, isEditing } = useEditCharacter(setOpen);

  const isEditAction = isExistingCharacter(character ?? ({} as Character));
  const characterSchema = isEditAction
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

  const onSubmit = () => {
    const values = form.getValues();
    if (isEditAction && isExistingCharacter(character))
      editCharacter({ characterData: values as ExistingCharacter });
    if (!isEditAction) addCharacter({ characterData: values });
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
          maxLength={FORM_BLURB_MAX_LENGTH}
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
            disabled={!form.formState.isValid || isAdding || isEditing}
            className="sm:w-fit w-full"
          >
            {isEditAction ? "Save changes" : "Add character"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
