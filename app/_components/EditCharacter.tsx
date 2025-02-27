"use client";
import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { Character } from "../_schemas/Character";
import { editCharacterAction } from "../dashboard/actionsCharacters";
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

export default function EditCharacter({ character }: { character: Character }) {
  const { characterName } = character;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <TbEdit />
          <span>Edit {characterName}</span>
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
