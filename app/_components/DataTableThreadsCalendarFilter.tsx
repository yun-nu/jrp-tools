"use client";

import { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, CircleX } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useNumberInput } from "../_hooks/useNumberInput";
import { ExistingThread } from "../_schemas/Thread";
import { TooltipWrapperButton } from "./TooltipWrappers";
import { Button } from "./ui/Button";
import { Calendar } from "./ui/Calendar";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

export default function DataTableThreadsCalendarFilter({
  table,
}: {
  table: Table<ExistingThread>;
}) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const now = new Date();
  const initialSelectedState = {
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  };
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    initialSelectedState
  );

  const {
    value: currentInputValue,
    setValue: setCurrentInputValue,
    number: currentCount,
    setNumber: setCurrentCount,
    handleChange: handleCurrentChange,
  } = useNumberInput(undefined);

  const {
    value: totalInputValue,
    setValue: setTotalInputValue,
    number: totalCount,
    setNumber: setTotalCount,
    handleChange: handleTotalChange,
  } = useNumberInput(undefined);

  const commentFilters = [
    {
      label: "Minimum # comments:",
      id: "min-comments",
      value: currentInputValue,
      onChange: handleCurrentChange,
    },
    {
      label: "Minimum # total comments:",
      id: "min-total-comments",
      value: totalInputValue,
      onChange: handleTotalChange,
    },
  ];

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    if (currentInputValue === "" || totalInputValue === "") {
      setCurrentCount(undefined);
      setTotalCount(undefined);
      table.getColumn("commentCount")?.setFilterValue(undefined);
      table.getColumn("totalCommentCount")?.setFilterValue(undefined);
    } else {
      setCurrentCount(currentCount);
      table.getColumn("commentCount")?.setFilterValue(currentCount);
      table.getColumn("totalCommentCount")?.setFilterValue(totalCount);
    }

    if (range?.from && range?.to) {
      table.getColumn("date")?.setFilterValue({
        from: range.from,
        to: range.to,
      });
    } else {
      setDateRange(undefined);
      table.getColumn("date")?.setFilterValue(undefined);
    }

    setOpen(false);
  };

  const resetFilters = () => {
    setDateRange(undefined);
    setSelectedRange(initialSelectedState);
    setCurrentInputValue("");
    setCurrentCount(undefined);
    setTotalInputValue("");
    setTotalCount(undefined);
    table.getColumn("commentCount")?.setFilterValue(undefined);
    table.getColumn("totalCommentCount")?.setFilterValue(undefined);
    table.getColumn("date")?.setFilterValue(undefined);
  };

  return (
    <div className="w-full flex items-center gap-2 sm:gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`
              "justify-start text-left font-normal",
              ${dateRange && "border border-green-700"}
            `}
          >
            <CalendarIcon />
            {dateRange?.from && dateRange?.to ? (
              dateRange?.from.getTime() === dateRange?.to.getTime() ? (
                format(dateRange.from, "LLL dd")
              ) : (
                <>
                  {format(dateRange.from, "LLL dd")} -{" "}
                  {format(dateRange.to, "LLL dd")}
                </>
              )
            ) : (
              <span>Activity Range Filter</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 grid gap-y-4" align="start">
          {commentFilters.map((filter) => (
            <div
              className="flex items-center justify-between gap-2"
              key={filter.id}
            >
              <Label htmlFor={filter.id}>{filter.label}</Label>
              <Input
                id={filter.id}
                type="number"
                value={filter.value}
                onChange={filter.onChange}
                className="w-16 h-8 text-center"
                onKeyDown={(e) =>
                  e.key === "Enter" && handleDateRangeChange(selectedRange)
                }
              />
            </div>
          ))}
          <Calendar
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={setSelectedRange}
            autoFocus
          />
          <Button
            className="w-full"
            onClick={() => handleDateRangeChange(selectedRange)}
          >
            Apply filter
          </Button>
        </PopoverContent>
      </Popover>

      <TooltipWrapperButton
        icon={CircleX}
        onClick={() => {
          resetFilters();
        }}
        text="Reset activity range search"
      ></TooltipWrapperButton>
    </div>
  );
}
