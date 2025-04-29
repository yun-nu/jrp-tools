"use client";

import { Row } from "@tanstack/react-table";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useUpdateCommentCount } from "../_hooks/threads/useUpdateCommentCount";
import { useNumberInput } from "../_hooks/useNumberImput";
import { ExistingThread } from "../_schemas/Thread";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

export default function CommentCountActions({
  row,
}: {
  row: Row<ExistingThread>;
}) {
  const {
    value: inputValue,
    setValue: setInputValue,
    number: count,
    setNumber: setCount,
    handleChange,
  } = useNumberInput(row.getValue("commentCount") as number);
  const [open, setOpen] = useState(false);

  const { mutate: updateCommentCount } = useUpdateCommentCount();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open && count !== row.getValue("commentCount"))
      updateCommentCount({
        threadId: row.original.id,
        updatedCount: count,
      });
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild className="w-12">
        <Button variant="outline">{count}</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit"
        onKeyDown={(e) => e.key === "Enter" && handleOpenChange(false)}
      >
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <MinusCircle
              className="h-4 cursor-pointer hover:text-primary transition-colors"
              onClick={() => {
                const newCount = Math.max(0, count - 1);
                setCount(newCount);
                setInputValue(String(newCount));
              }}
            />
            <Input
              type="number"
              value={inputValue}
              onChange={handleChange}
              className="w-12 h-8 text-center"
            />
            <PlusCircle
              className="h-4 cursor-pointer hover:text-primary transition-colors"
              onClick={() => {
                const newCount = count + 1;
                setCount(newCount);
                setInputValue(String(newCount));
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
