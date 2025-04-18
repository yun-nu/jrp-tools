"use client";

import { FaUserMinus } from "react-icons/fa";
import { useDeleteCharacter } from "../_hooks/characters/useDeleteCharacter";
import { ExistingCharacter } from "../_schemas/Character";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog";
import { Button } from "./ui/Button";

export default function DeleteCharacter({
  character,
}: {
  character: ExistingCharacter;
}) {
  const { id: characterId, characterName } = character;
  const { mutate: deleteCharacter } = useDeleteCharacter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size="icon" title="Delete character">
          <FaUserMinus />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {characterName}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the character {characterName}? Once
            deleted, a character cannot be restored!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            type="button"
            onClick={() => deleteCharacter({ characterId })}
            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
