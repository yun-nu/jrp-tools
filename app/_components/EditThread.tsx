import { Dispatch, SetStateAction } from "react";
import { Thread } from "../_schemas/Thread";
import { editThreadAction } from "../account/actions-threads";
import { ThreadForm } from "./ThreadForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";

type EditThreadProps = {
  thread: Thread;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditThread({
  thread,
  isOpen,
  setIsOpen,
}: EditThreadProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit thread</DialogTitle>
          <DialogDescription>Edit your thread information</DialogDescription>
        </DialogHeader>

        <ThreadForm
          setOpen={setIsOpen}
          action={editThreadAction}
          thread={thread}
        ></ThreadForm>
      </DialogContent>
    </Dialog>
  );
}
