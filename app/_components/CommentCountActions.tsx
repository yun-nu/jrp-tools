"use client";

import { Row } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { useUpdateCurrentCommentCount } from "../_hooks/threads/useUpdateCurrentCommentCount";
import { useUpdateTotalCommentCount } from "../_hooks/threads/useUpdateTotalCommentCount";
import { useNumberInput } from "../_hooks/useNumberInput";
import { toast } from "../_hooks/useToast";
import { ExistingThread } from "../_schemas/Thread";
import CounterWithButtons from "./CounterWithButtons";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

export default function CommentCountActions({
  row,
}: {
  row: Row<ExistingThread>;
}) {
  const [open, setOpen] = useState(false);

  const {
    value: currentInputValue,
    setValue: setCurrentInputValue,
    number: currentCount,
    setNumber: setCurrentCount,
    handleChange: handleCurrentChange,
  } = useNumberInput(row.getValue("commentCount"));

  const {
    value: totalInputValue,
    setValue: setTotalInputValue,
    number: totalCount,
    setNumber: setTotalCount,
    handleChange: handleTotalChange,
  } = useNumberInput(row.getValue("totalCommentCount"));

  const safeCurrentCount = currentCount ?? 0;
  const safeTotalCount = totalCount ?? 0;

  const originalCurrentCount = useRef<number>(row.getValue("commentCount"));
  const originalTotalCount = useRef<number>(row.getValue("totalCommentCount"));

  const { mutate: updateCommentCount } = useUpdateCurrentCommentCount();
  const { mutate: updateTotalCommentCount } = useUpdateTotalCommentCount();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      originalCurrentCount.current = row.getValue("commentCount");
      originalTotalCount.current = row.getValue("totalCommentCount");
    }

    if (!open) {
      const currentChanged = safeCurrentCount !== originalCurrentCount.current;
      const totalChanged = safeTotalCount !== originalTotalCount.current;

      if (safeCurrentCount > safeTotalCount) {
        toast({
          description: "Total count cannot be smaller than current count",
          variant: "alert",
        });
        return;
      }

      if (currentChanged && totalChanged) {
        updateCommentCount({
          threadId: row.original.id,
          updatedCount: safeCurrentCount,
        });
      } else if (totalChanged) {
        updateTotalCommentCount({
          threadId: row.original.id,
          updatedCount: safeTotalCount,
        });
      }
    }
  };

  useEffect(() => {
    const previousTotal =
      Number(row.getValue("totalCommentCount")) -
      Number(row.getValue("commentCount"));

    let newTotal = safeCurrentCount + previousTotal;
    if (newTotal < 0) newTotal = 0;

    setTotalCount(newTotal);
    setTotalInputValue(String(newTotal));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCount]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild className="w-12">
        <Button
          variant="outline"
          className="mx-auto h-fit w-20 flex flex-col gap-0.5 items-center justify-center"
        >
          {currentCount}
          <span className="text-xs text-muted-foreground">
            {" "}
            Total: {totalCount}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit"
        onKeyDown={(e) => e.key === "Enter" && handleOpenChange(false)}
      >
        <div className="grid gap-4">
          <CounterWithButtons
            label="# Comments for current month"
            value={safeCurrentCount}
            setValue={setCurrentCount}
            inputValue={currentInputValue}
            setInputValue={setCurrentInputValue}
            handleChange={handleCurrentChange}
          />

          <CounterWithButtons
            label="# Total comments in the thread"
            value={safeTotalCount}
            setValue={setTotalCount}
            inputValue={totalInputValue}
            setInputValue={setTotalInputValue}
            handleChange={handleTotalChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
