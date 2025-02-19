"use client";
import { BsFillPersonDashFill } from "react-icons/bs";
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
import SubmitButton from "./SubmitButton";
import { deleteCharacterAction } from "../dashboard/actions";
import { startTransition } from "react";
import { Character } from "../_schemas/Character";
import { Button } from "./ui/Button";

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export default function DeleteCharacter({
  character,
}: {
  character: Character;
}) {
  const { id, user_id, characterName } = character;
  const handleDeleteCharacter = () => {
    startTransition(() => deleteCharacterAction({ user_id, id }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* btn className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full */}
        <Button variant={"destructive"}>
          <BsFillPersonDashFill />
          <span>Delete {characterName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {characterName}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the character {characterName}? This
            action cannot be undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            type="button"
            onClick={handleDeleteCharacter}
            variant={"destructive"}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
