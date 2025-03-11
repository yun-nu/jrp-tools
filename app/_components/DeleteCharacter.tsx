"use client";
import { useRouter } from "next/navigation";
import { FaUserMinus } from "react-icons/fa";
import { toast } from "../_hooks/useToast";
import { deleteCharacterAction } from "../account/actions-characters";
import { CardButtonProps } from "./EditCharacter";
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
  btnSize,
  text,
}: CardButtonProps) {
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
        <Button variant={"destructive"} size={btnSize} title="Delete character">
          <FaUserMinus />
          {text}
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
