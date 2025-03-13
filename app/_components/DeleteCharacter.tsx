"use client";
import { useRouter } from "next/navigation";
import { FaUserMinus } from "react-icons/fa";
import { toast } from "../_hooks/useToast";
import { Character } from "../_schemas/Character";
import { deleteCharacterAction } from "../account/actions-characters";
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
  character: Character;
}) {
  const { id, userId, characterName } = character;
  const router = useRouter();

  const handleDeleteCharacter = async () => {
    const result = await deleteCharacterAction({ userId, id });
    if (result.error) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success, className: "bg-green-700" });
      router.push(`/account`);
    }
  };

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
            onClick={handleDeleteCharacter}
            className="bg-destructive hover:bg-destructive/80 text-primary"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
