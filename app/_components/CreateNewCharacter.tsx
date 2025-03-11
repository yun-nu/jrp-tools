"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { addCharacterAction } from "../account/actions-characters";
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

export default function CreateNewCharacter() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="text-base">
          <FaUserPlus />
          Add new character
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new Character</DialogTitle>
          <DialogDescription>
            Fields not marked as &quot;required&quot; are optional. Any and all
            fields can be changed later.
          </DialogDescription>
        </DialogHeader>

        <CharacterForm
          setOpen={setOpen}
          action={addCharacterAction}
        ></CharacterForm>
      </DialogContent>
    </Dialog>
  );
}
