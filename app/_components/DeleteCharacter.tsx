"use client";
import { useRouter } from "next/navigation";
import { BsFillPersonDashFill } from "react-icons/bs";
import { toast } from "../_hooks/useToast";
import { Character } from "../_schemas/Character";
import { deleteCharacterAction } from "../dashboard/actions-characters";
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
      router.push(`/dashboard`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <BsFillPersonDashFill />
          <span>Delete {characterName}</span>
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
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
