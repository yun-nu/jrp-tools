"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { z } from "zod";
import { characterSchema } from "../_schemas/Character";
import {
  addCharacterAction,
  verifyDisplayNameAvailability,
} from "../dashboard/actions";
import CheckboxWithText from "./CheckboxWithText";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Form } from "./ui/Form";
import { useState } from "react";
import { toast } from "../_hooks/use-toast";
import { useRouter } from "next/navigation";

/// extract the form to its own component to reuse it on the edit modal

export function CharacterForm() {
  const [open, setOpen] = useState(false);
  const [isValidDisplayName, setIsValidDisplayName] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      displayName: "",
      characterName: "",
      acLink: "",
      gameName: "",
      isPublic: false,
      journalLink: "",
      journalName: "",
    },
  });

  const onSubmit = async () => {
    const result = await addCharacterAction(form.getValues());
    if (result.error || result.errors) {
      toast({
        description: result.error || result.message,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success, variant: "default" });
      form.reset();
      router.push(`/dashboard/${result.displayName}`);
      setOpen(false);
    }
  };

  const handleVerifyAvailability = async () => {
    const result = await verifyDisplayNameAvailability(
      form.getValues("displayName")
    );
    if (result.taken) {
      setIsValidDisplayName(false);
      form.setError("displayName", {
        message: "This display name is already taken.",
      });
    }
    if (!result.taken) {
      setIsValidDisplayName(true);
      form.clearErrors();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
          <BsFillPersonPlusFill />
          <span>Add new character</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new Character</DialogTitle>
          <DialogDescription>
            Fields not marked as &quot;required&quot; are optional. Any and all
            fields can be changed later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputWithLabel
              fieldTitle="Display Name"
              nameInSchema="displayName"
              description="Required. This is the unique username for your character."
              onBlur={handleVerifyAvailability}
            />

            <InputWithLabel
              fieldTitle="Character Name"
              nameInSchema="characterName"
              description="Required. This the name that will be displayed on your character list and page."
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

            {/*
                        {isDisplayNameTaken ? (
              <p className="text-sm">{isDisplayNameTaken.message}</p>
            ) : null}

            
            {errors ? (
              <div className="mb-10 text-red-500">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{`${key}: ${
                    errors[key as keyof typeof errors]
                  }`}</p>
                ))}
              </div>
            ) : null} */}

            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid || !isValidDisplayName}
              >
                Add Character
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <form
action={addCharacterAction}
className="py-8 px-12 text-base flex gap-6 flex-col"
>
<Input
  id="displayName"
  label="Display Name"
  type="text"
  description="Each display name is unique. This is the username for your character page."
  required
  onChange={(e) => setDisplayName(e.target.value)}
  onBlur={handleVerifyAvailability}
/>

<p className={state?.taken ? "text-red-500" : "text-green-500"}>
  {state?.message}
</p>

<Input
  id="characterName"
  label="Character Name"
  type="text"
  required
/>

<Input id="journalName" label="Journal Name" type="text" />

<Input
  id="journalLink"
  label="Journal Link"
  type="text"
  pattern={linkPattern}
  description="Must start with http:// or https://"
  placeholder="https://journal-name.platform.com/"
/>

<Input id="game" label="Game Name" type="text" />

<Input
  id="acLink"
  label="AC Link"
  type="text"
  pattern={linkPattern}
  description="Must start with http:// or https://"
  placeholder="https://game.platform.com/thread"
/>

<Input
  id="isPublic"
  label="Make character profile public?"
  type="checkbox"
  description="Character profiles are private
  by default. If you'd like to share your character page, check this option."
/>

<DialogFooter>
  <DialogClose>Cancel</DialogClose>
  <SubmitButton type="submit" content="Add character" />
</DialogFooter>
</form> */
}
