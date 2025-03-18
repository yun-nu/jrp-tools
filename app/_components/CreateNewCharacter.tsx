"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useIsMobile } from "../_hooks/useIsMobile";
import { addCharacterAction } from "../account/actions-characters";
import { CharacterForm } from "./CharacterForm";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/Drawer";
import { Separator } from "./ui/Separator";

export default function CreateNewCharacter() {
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  const title = "Add new Character";
  const description =
    'Fields not marked as "required" are optional. Any of the fields can be changed later.';

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>
            <FaUserPlus />
            Add new character
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <div className="p-4 overflow-y-auto">
            <DrawerHeader className="text-left px-0 py-6">
              <DrawerTitle>{title}</DrawerTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DrawerHeader>
            <CharacterForm setOpen={setOpen} action={addCharacterAction} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FaUserPlus />
          Add new character
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:p-8 sm:max-w-[50dvw] max-h-[90vh] grid grid-rows-[1fr_auto_1fr_auto] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <CharacterForm setOpen={setOpen} action={addCharacterAction} />
      </DialogContent>
    </Dialog>
  );
}
