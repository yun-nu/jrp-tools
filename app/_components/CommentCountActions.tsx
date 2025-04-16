"use client";

import { Row } from "@tanstack/react-table";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { ExistingThread } from "../_schemas/Thread";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { updateCommentCountAction } from "../account/actions-threads";
import {
  actionReturnError,
  actionReturnSuccess,
} from "../_utils/action-return";
import { toast } from "../_hooks/useToast";

export default function CommentCountActions({
  row,
}: {
  row: Row<ExistingThread>;
}) {
  const [count, setCount] = useState(row.getValue("commentCount") as number);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open && count !== row.getValue("commentCount"))
      handleCommentCountChange();
  };

  const handleCommentCountChange = async () => {
    const result = await updateCommentCountAction(row.original.id, count);
    if (actionReturnSuccess(result)) {
      toast({
        description: result.success,
        variant: "success",
      });
    }
    if (actionReturnError(result)) {
      toast({
        description: result.error || result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild className="w-12">
        <Button variant="outline">{count}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <MinusCircle
              className="h-4 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setCount((prev) => Math.max(0, prev - 1))}
            />
            <Input
              type="text"
              value={count}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 0) {
                  setCount(val);
                }
              }}
              className="w-12 h-8 text-center"
            />
            <PlusCircle
              className="h-4 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setCount((prev) => prev + 1)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
