"use client";
import { useRouter } from "next/navigation";
import { toast } from "../_hooks/useToast";

import { deleteUserAction } from "../account/settings/actions";
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

export default function DeleteAccount() {
  const router = useRouter();

  const handleDeleteCharacter = async () => {
    const result = await deleteUserAction();
    if (result.error) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success });
      router.push(`/account`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="w-full sm:w-fit">
          Delete account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you absolutely sure you want to delete your account? All your
            data will be permanently erased.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            type="button"
            onClick={handleDeleteCharacter}
            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
