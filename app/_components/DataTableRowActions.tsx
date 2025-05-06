"use client";

import {
  Copy,
  DropletOff,
  Edit,
  LinkIcon,
  MoreHorizontal,
  SquareCheckBig,
  SquarePlay,
  Trash,
} from "lucide-react";
import { createElement, useState } from "react";
import { useDuplicateThread } from "../_hooks/threads/useDuplicateThread";
import { useToggleThreadStatus } from "../_hooks/threads/useToggleThreadFinished";
import { toast } from "../_hooks/useToast";
import { ExistingThread } from "../_schemas/Thread";
import DeleteThread from "./DeleteThread";
import ThreadDialog from "./ThreadDialog";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export default function DataTableRowActions({
  thread,
}: {
  thread: ExistingThread;
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { toggleThreadStatus, isToggling } = useToggleThreadStatus();
  const { duplicateThread, isDuplicating } = useDuplicateThread();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(thread.url as string);
    toast({
      description: "URL copied to clipboard",
    });
  };

  const statusActions = [
    {
      show: (status: ExistingThread["status"]) => status !== "dropped",
      drop: false,
      getIcon: (status: ExistingThread["status"]) =>
        status === "ongoing" ? SquareCheckBig : SquarePlay,
      getLabel: (status: ExistingThread["status"]) =>
        `Mark as ${status === "ongoing" ? "finished" : "ongoing"}`,
    },
    {
      show: (status: ExistingThread["status"]) => status !== "finished",
      drop: true,
      getIcon: (status: ExistingThread["status"]) =>
        status === "ongoing" ? DropletOff : SquarePlay,
      getLabel: (status: ExistingThread["status"]) =>
        `Mark as ${status === "dropped" ? "ongoing" : "dropped"}`,
    },
  ];

  return (
    <>
      <DeleteThread
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        thread={thread}
      />

      <ThreadDialog
        isControlled
        mode="edit"
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        thread={thread}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={handleCopyUrl}>
            <button className="flex gap-2">
              <LinkIcon /> Copy URL
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex gap-2" onClick={() => setIsEditOpen(true)}>
              <Edit /> <span>Edit thread</span>
            </button>
          </DropdownMenuItem>
          {statusActions.map(
            ({ show, drop, getIcon, getLabel }, i) =>
              show(thread.status) && (
                <DropdownMenuItem key={i}>
                  <button
                    className="flex gap-2"
                    onClick={() => toggleThreadStatus({ thread, drop })}
                    disabled={isToggling}
                  >
                    {createElement(getIcon(thread.status))}
                    {getLabel(thread.status)}
                  </button>
                </DropdownMenuItem>
              )
          )}

          <DropdownMenuItem>
            <button
              className="flex gap-2"
              onClick={() => duplicateThread({ thread })}
              disabled={isDuplicating}
            >
              <Copy /> Duplicate thread
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500 flex">
            <button
              className="flex gap-2"
              onClick={() => setIsDeleteOpen(true)}
            >
              <Trash />
              <span>Delete thread</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
