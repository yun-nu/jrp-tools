"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "../_hooks/useToast";
import { Thread } from "../_schemas/Thread";
import { deleteThreadAction } from "../dashboard/actions-threads";
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
  thread: Thread;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteThread({ thread, isOpen, setIsOpen }: Props) {
  const router = useRouter();
  const { id: threadId } = thread;

  const handleDeleteThread = async () => {
    const result = await deleteThreadAction(threadId);
    if (result.error) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success, className: "bg-green-700" });
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
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
