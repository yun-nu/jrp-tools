"use client";

import { Table } from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";
import DataTableThreadsCalendarFilter from "./DataTableThreadsCalendarFilter";
import { TooltipWrapperButton } from "./TooltipWrappers";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";

type DataTableActivityProps<TData> = {
  table: Table<TData>;
  minComments: number;
  setMinComments: Dispatch<SetStateAction<number>>;
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  highlightAcLength: boolean;
  setHighlightAcLength: (newValue: boolean) => void;
};

export default function DataTableActivityOptions<TData>({
  table,
  minComments,
  setMinComments,
  dateRange,
  setDateRange,
  highlightAcLength,
  setHighlightAcLength,
}: DataTableActivityProps<TData>) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <div className="flex items-center gap-4">
        <DataTableThreadsCalendarFilter
          table={table}
          minComments={minComments}
          setMinComments={setMinComments}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <TooltipWrapperButton
          icon={CircleX}
          onClick={() => {
            setDateRange(undefined);
            table.getColumn("commentCount")?.setFilterValue(undefined);
            table.getColumn("date")?.setFilterValue(undefined);
          }}
          text="Reset activity range search"
        ></TooltipWrapperButton>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          className="h-4 w-9"
          thumbClassName="h-3 w-3"
          id="highlight-ac-length"
          onCheckedChange={() => setHighlightAcLength(!highlightAcLength)}
          checked={highlightAcLength}
        />
        <Label htmlFor="highlight-ac-length" className="text-sm font-normal">
          Highlight AC length threads
        </Label>
      </div>
    </div>
  );
}
