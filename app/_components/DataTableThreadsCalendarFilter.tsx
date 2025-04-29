"use client";

import { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNumberInput } from "../_hooks/useNumberImput";
import { Button } from "./ui/Button";
import { Calendar } from "./ui/Calendar";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

type DataThreadCalendarFilterProps<TData> = {
  table: Table<TData>;
  minComments: number;
  setMinComments: Dispatch<SetStateAction<number>>;
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
};

export default function DataTableThreadsCalendarFilter<TData>({
  table,
  minComments,
  setMinComments,
  dateRange,
  setDateRange,
}: DataThreadCalendarFilterProps<TData>) {
  const [open, setOpen] = useState(false);
  const {
    value: inputValue,
    number: count,
    handleChange,
  } = useNumberInput(minComments);

  const now = new Date();
  const { year, month, day } = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
  };
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: new Date(year, month, 1),
    to: new Date(year, month, day),
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    if (inputValue === "") {
      setMinComments(0);
      table.getColumn("commentCount")?.setFilterValue(undefined);
    } else {
      setMinComments(count);
      table.getColumn("commentCount")?.setFilterValue(count);
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

  return (
    <div className="grid gap-2">
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
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="min-comments">Minimum # comments: </Label>
            <Input
              id="min-comments"
              type="number"
              value={inputValue}
              onChange={handleChange}
              className="w-16 h-8 text-center"
              onKeyDown={(e) =>
                e.key === "Enter" && handleDateRangeChange(selectedRange)
              }
              autoFocus
            />
          </div>
          <Calendar
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={setSelectedRange}
          />
          <Button
            className="w-full"
            onClick={() => handleDateRangeChange(selectedRange)}
          >
            Apply filter
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
