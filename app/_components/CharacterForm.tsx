"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../_hooks/useToast";
import { Character, characterSchema } from "../_schemas/Character";
import { verifyDisplayNameAvailability } from "../account/actions-characters";
import CheckboxWithText from "./CheckboxWithText";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { DialogClose, DialogFooter } from "./ui/Dialog";
import { Form } from "./ui/Form";
import {
  actionReturnError,
  actionReturnSuccess,
  ActionResult,
} from "../_utils/action-return";
import TextareaWithLabel from "./TextareaWithLabel";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { IoInformation, IoInformationCircleOutline } from "react-icons/io5";
import { BadgeInfo } from "lucide-react";
import { FaRegLightbulb } from "react-icons/fa6";

type Props = {
  setOpen: (open: boolean) => void;
  character?: Character;
  action: (
    characterData: Character,
    characterId?: number
  ) => Promise<ActionResult>;
};

export function CharacterForm({ setOpen, character, action }: Props) {
  const [isValidDisplayName, setIsValidDisplayName] = useState(false);
  const router = useRouter();

  const { id: characterId, ...values } = character || {};

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: characterId
      ? values
      : {
          displayName: "",
          characterName: "",
          blurb: "",
          acLink: "",
          gameName: "",
          isPublic: false,
          journalLink: "",
          journalName: "",
          icon: "",
        },
  });

  const onSubmit = async () => {
    const result = await action(form.getValues(), characterId);

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
      router.push(`/account/${result.displayName}`);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputWithLabel
          fieldTitle="Display Name"
          nameInSchema="displayName"
          description="Required. This is the unique username for your character. Can only contain alphanumeric characters and underscores."
          onBlur={handleVerifyAvailability}
        />
        <InputWithLabel
          fieldTitle="Character Name"
          nameInSchema="characterName"
          description="Required. This the name that will be displayed on your character list and page."
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
          placeholder="Maximum of 500 characters"
        />
        <InputWithLabel fieldTitle="Game Name" nameInSchema="gameName" />
        <InputWithLabel fieldTitle="Journal" nameInSchema="journalName" />
        <InputWithLabel
          fieldTitle="Journal Link"
          nameInSchema="journalLink"
          placeholder="Must start with http:// or https://"
        />
        <InputWithLabel
          fieldTitle="AC Link"
          nameInSchema="acLink"
          placeholder="Must start with http:// or https://"
        />
        <CheckboxWithText
          nameInSchema="isPublic"
          fieldTitle="Make character profile public"
          description="Character profiles are private
  by default. If you'd like to share your character page, check this option."
        />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            type="submit"
            disabled={!isValidDisplayName || form.formState.isSubmitting}
          >
            {characterId ? "Save changes" : "Add character"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
