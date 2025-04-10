"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "../_hooks/useToast";
import { ExistingThread } from "../_schemas/Thread";
import {
  actionReturnError,
  actionReturnSuccess,
} from "../_utils/action-return";
import { deleteThreadAction } from "../account/actions-threads";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";

type Props = {
  thread: ExistingThread;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteThread({ thread, isOpen, setIsOpen }: Props) {
  const router = useRouter();
  const { id: threadId } = thread;

  const handleDeleteThread = async () => {
    const result = await deleteThreadAction(threadId);
    if (actionReturnError(result)) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    }
    if (actionReturnSuccess(result)) {
      toast({ description: result.success, variant: "success" });
      router.refresh();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete thread</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this thread? Once deleted, a thread
            cannot be restored!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={handleDeleteThread}
            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
