import {
  Copy,
  Edit,
  LinkIcon,
  MoreHorizontal,
  SquareCheckBig,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../_hooks/useToast";
import { Thread } from "../_schemas/Thread";
import {
  duplicateThreadAction,
  toggleIsFinishedAction,
} from "../account/actions-threads";
import DeleteThread from "./DeleteThread";
import EditThread from "./EditThread";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export default function DataTableRowActions({ thread }: { thread: Thread }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { refresh } = useRouter();

  const handleToggleThreadStatus = async () => {
    const result = await toggleIsFinishedAction(thread);

    if (result.error) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success, className: "bg-green-700" });
      refresh();
    }
  };

  const handleDuplicateThread = async () => {
    const result = await duplicateThreadAction(thread);
    if (result.error) {
      toast({
        description: result.error,
        variant: "destructive",
      });
      return;
    } else {
      toast({ description: result.success, className: "bg-green-700" });
      refresh();
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(thread.url as string);
    toast({
      description: "URL copied to clipboard",
    });
  };

  return (
    <>
      <DeleteThread
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        thread={thread}
      />

      <EditThread
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
          <DropdownMenuItem role="button" onClick={handleToggleThreadStatus}>
            <button className="flex gap-2">
              <SquareCheckBig /> Mark as{" "}
              {thread.isFinished ? "ongoing" : "finished"}
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="flex gap-2" onClick={handleDuplicateThread}>
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
