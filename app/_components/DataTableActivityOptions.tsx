"use client";

import { Table } from "@tanstack/react-table";
import DataTableThreadsCalendarFilter from "./DataTableThreadsCalendarFilter";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";

type DataTableActivityProps<TData> = {
  table: Table<TData>;
  highlightAcLength: boolean;
  setHighlightAcLength: (newValue: boolean) => void;
};

export default function DataTableActivityOptions<TData>({
  table,
  highlightAcLength,
  setHighlightAcLength,
}: DataTableActivityProps<TData>) {
  return (
    <div className="flex flex-col gap-6 items-center sm:items-start">
      <DataTableThreadsCalendarFilter table={table} />

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
