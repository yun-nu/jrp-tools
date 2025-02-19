"use client";

import { useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { addCharacterAction } from "../dashboard/characterActions";
import { CharacterForm } from "./CharacterForm";
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

        <CharacterForm
          setOpen={setOpen}
          action={addCharacterAction}
        ></CharacterForm>
      </DialogContent>
    </Dialog>
  );
}
