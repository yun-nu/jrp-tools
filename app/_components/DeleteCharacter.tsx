"use client";
import { useRouter } from "next/navigation";
import { BsFillPersonDashFill } from "react-icons/bs";
import { toast } from "../_hooks/use-toast";
import { Character } from "../_schemas/Character";
import { deleteCharacterAction } from "../dashboard/characterActions";
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
      toast({ description: result.success, variant: "default" });
      router.push(`/dashboard`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
