"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { ExistingCharacter } from "../_schemas/Character";
import { Thread } from "../_schemas/Thread";
import { DesktopDialog, MobileDrawer } from "./ResponsiveDialog";
import { ThreadForm } from "./ThreadForm";
import { Button } from "./ui/Button";
import { useScreenSize } from "../_hooks/useScreenSize";

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
  characterId: ExistingCharacter["id"];
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

  const screenSize = useScreenSize();

  const dialogContent = {
    add: {
      title: "Add new thread",
      trigger: (
        <Button className="w-full sm:w-[400px]">
          <FaUserPlus />
          Add new thread
        </Button>
      ),
    },

    edit: {
      title: "Edit thread",
      description: "Edit thread information",
    },
  };

  const currentContent = dialogContent[mode];

  const DialogComponent =
    screenSize === "mobile" ? MobileDrawer : DesktopDialog;

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
        characterId={characterId}
        thread={thread}
      />
    </DialogComponent>
  );
}
