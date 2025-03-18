"use client";

import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { useIsMobile } from "../_hooks/useMediaQuery";
import { Character } from "../_schemas/Character";
import { addThreadAction } from "../account/actions-threads";
import { ThreadForm } from "./ThreadForm";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
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

export default function CreateNewThread({
  characterId,
}: {
  characterId: Character["id"];
}) {
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();
  const title = "Add new Thread";

  if (isMobile)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>
            <FaUserPlus />
            Add new thread
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <div className="p-4 overflow-y-auto">
            <DrawerHeader className="text-left px-0 py-6">
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
            <ThreadForm
              setOpen={setOpen}
              action={addThreadAction}
              characterId={characterId}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookmarkPlus />
          Add new thread
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:p-8 sm:max-w-[50dvw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new thread</DialogTitle>
        </DialogHeader>

        <Separator className="my-2" />

        <ThreadForm
          setOpen={setOpen}
          action={addThreadAction}
          characterId={characterId}
        />
      </DialogContent>
    </Dialog>
  );
}
