"use client";

import { useState } from "react";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { useIsMobile } from "../_hooks/useIsMobile";
import { Character } from "../_schemas/Character";
import {
  addCharacterAction,
  editCharacterAction,
} from "../account/actions-characters";
import { CharacterForm } from "./CharacterForm";
import { DesktopDialog, MobileDrawer } from "./ResponsiveDialog";
import { Button } from "./ui/Button";

interface CharacterDialogBaseProps {
  mode: "add" | "edit";
}

interface AddCharacterDialogProps extends CharacterDialogBaseProps {
  mode: "add";
  character?: never;
}

interface EditCharacterDialogProps extends CharacterDialogBaseProps {
  mode: "edit";
  character: Character;
}

type CharacterDialogProps = AddCharacterDialogProps | EditCharacterDialogProps;

export default function CharacterDialog({
  character,
  mode = character ? "edit" : "add",
}: CharacterDialogProps) {
  const { characterName } = character || {};
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  const dialogContent = {
    add: {
      title: "Add new character",
      description:
        'Fields not marked as "required" are optional. Entered data can be changed later.',
      trigger: (
        <Button>
          <FaUserPlus />
          Add new character
        </Button>
      ),
      action: addCharacterAction,
    },
    edit: {
      title: `Edit ${characterName}`,
      description: "Edit your character data",
      trigger: (
        <Button variant="outline" size="icon" title="Edit character">
          <FaUserEdit />
        </Button>
      ),
      action: editCharacterAction,
    },
  };

  const currentContent = dialogContent[mode];

  const DialogComponent = isMobile ? MobileDrawer : DesktopDialog;

  return (
    <DialogComponent
      open={open}
      onOpenChange={setOpen}
      title={currentContent.title}
      description={currentContent.description}
      trigger={currentContent.trigger}
    >
      <CharacterForm
        character={character}
        action={currentContent.action}
        setOpen={setOpen}
      />
    </DialogComponent>
  );
}
