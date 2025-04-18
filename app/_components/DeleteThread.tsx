"use client";

import { Dispatch, SetStateAction } from "react";
import { ExistingThread } from "../_schemas/Thread";
import { useDeleteThread } from "../_hooks/threads/useDeleteThread";
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
  const { id: threadId } = thread;
  const { mutate: deleteThread } = useDeleteThread();

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
            onClick={() => deleteThread({ threadId })}
            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
