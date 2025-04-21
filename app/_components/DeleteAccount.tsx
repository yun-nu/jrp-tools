"use client";

import { useRouter } from "next/navigation";
import { toast } from "../_hooks/useToast";

import { deleteAccountAction } from "../account/settings/actions";
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
import { useDeleteAccount } from "../_hooks/auth/useDeleteAccount";

export default function DeleteAccount() {
  const { push } = useRouter();
  const { deleteAccount, isDeleting } = useDeleteAccount(push);

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
            onClick={() => deleteAccount()}
            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
