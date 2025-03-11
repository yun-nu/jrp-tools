"use client";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { Character } from "../_schemas/Character";
import { editCharacterAction } from "../account/actions-characters";
import { CharacterForm } from "./CharacterForm";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

export type CardButtonProps = {
  character: Character;
  btnSize: "icon" | "default" | "sm" | "lg" | null | undefined;
  text?: string;
};

export default function EditCharacter({
  character,
  btnSize,
  text,
}: CardButtonProps) {
  const { characterName } = character;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={btnSize} title="Edit character">
          <FaUserEdit />
          {text}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit {characterName}</DialogTitle>
          <DialogDescription>Edit your character data</DialogDescription>
        </DialogHeader>

        <CharacterForm
          setOpen={setOpen}
          character={character}
          action={editCharacterAction}
        ></CharacterForm>
      </DialogContent>
    </Dialog>
  );
}
