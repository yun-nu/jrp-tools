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
import { TbEdit } from "react-icons/tb";

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export default function EditCharacter({ character }: { character: Character }) {
  const { id, user_id, characterName } = character;
  const onSubmit = () => {
    startTransition(() => deleteCharacterAction({ user_id, id }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* btn className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full */}
        <Button variant={"outline"}>
          <TbEdit />
          <span>Edit {characterName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete character</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {characterName}? This action cannot
            be undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>

          <Button type="button" onClick={onSubmit} variant={"link"}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
