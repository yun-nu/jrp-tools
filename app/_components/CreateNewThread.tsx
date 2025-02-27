"use client";

import { useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Button } from "./ui/Button";
import { ThreadForm } from "./ThreadForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { addThreadAction } from "../dashboard/actions-threads";
import { Character } from "../_schemas/Character";

export default function CreateNewThread({
  characterId,
}: {
  characterId: Character["id"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
          <BsFillPersonPlusFill />
          <span>Add new Thread</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add new Thread</DialogTitle>
          <DialogDescription>
            Fields not marked as &quot;required&quot; are optional. Any and all
            fields can be changed later.
          </DialogDescription>
        </DialogHeader>

        <ThreadForm
          setOpen={setOpen}
          action={addThreadAction}
          characterId={characterId}
        />
      </DialogContent>
    </Dialog>
  );
}
