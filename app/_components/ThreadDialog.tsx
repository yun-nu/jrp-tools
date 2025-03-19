"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { useIsMobile } from "../_hooks/useIsMobile";
import { Character } from "../_schemas/Character";
import { Thread } from "../_schemas/Thread";
import { addThreadAction, editThreadAction } from "../account/actions-threads";
import { DesktopDialog, MobileDrawer } from "./ResponsiveDialog";
import { ThreadForm } from "./ThreadForm";
import { Button } from "./ui/Button";

interface ThreadDialogBaseProps {
  mode: "add" | "edit";
}

interface ControlledDialogProps extends ThreadDialogBaseProps {
  isControlled: true;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface UncontrolledDialogProps extends ThreadDialogBaseProps {
  isControlled?: false;
  isOpen?: never;
  setIsOpen?: never;
}

interface AddThreadDialogProps extends ThreadDialogBaseProps {
  mode: "add";
  characterId: Character["id"];
  thread?: never;
}

interface EditThreadDialogProps extends ThreadDialogBaseProps {
  mode: "edit";
  characterId?: never;
  thread: Thread;
}

type ThreadDialogProps =
  | (ControlledDialogProps & (AddThreadDialogProps | EditThreadDialogProps))
  | (UncontrolledDialogProps & (AddThreadDialogProps | EditThreadDialogProps));

export default function ThreadDialog(props: ThreadDialogProps) {
  const {
    characterId,
    thread,
    mode = thread ? "edit" : "add",
    isControlled,
  } = props;

  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = isControlled ? props.isOpen : internalOpen;
  const setIsOpen = isControlled ? props.setIsOpen : setInternalOpen;

  const isMobile = useIsMobile();

  const dialogContent = {
    add: {
      title: "Add new thread",
      trigger: (
        <Button>
          <FaUserPlus />
          Add new thread
        </Button>
      ),
      action: addThreadAction,
    },

    edit: {
      title: "Edit thread",
      description: "Edit thread information",
      action: editThreadAction,
    },
  };

  const currentContent = dialogContent[mode];

  const DialogComponent = isMobile ? MobileDrawer : DesktopDialog;

  return (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={"trigger" in currentContent ? currentContent.trigger : undefined}
      title={currentContent.title}
      description={
        "description" in currentContent ? currentContent.description : undefined
      }
    >
      <ThreadForm
        setOpen={setIsOpen}
        action={currentContent.action}
        characterId={characterId}
        thread={thread}
      />
    </DialogComponent>
  );
}
