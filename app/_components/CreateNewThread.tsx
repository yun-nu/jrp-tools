"use client";

import { BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { Character } from "../_schemas/Character";
import { addThreadAction } from "../account/actions-threads";
import { ThreadForm } from "./ThreadForm";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Separator } from "./ui/Separator";

export default function CreateNewThread({
  characterId,
}: {
  characterId: Character["id"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookmarkPlus />
          Add new Thread
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:p-8 sm:max-w-[50dvw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new Thread</DialogTitle>
          <DialogDescription>
            Fields not marked as &quot;required&quot; are optional. Any and all
            fields can be changed later.
          </DialogDescription>
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
