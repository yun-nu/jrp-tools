"use client";

import { Table } from "@tanstack/react-table";
import { ExistingCharacter } from "../_schemas/Character";
import { ExistingThread } from "../_schemas/Thread";
import DataTableThreadsCalendarFilter from "./DataTableThreadsCalendarFilter";
import HighlighterOptions from "./HighlighterOptions";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";

type DataTableActivityProps = {
  table: Table<ExistingThread>;
  highlightAcLength: boolean;
  setHighlightAcLength: (newValue: boolean) => void;
  setHighlightIndices: (indices: number[]) => void;
  acLength: ExistingCharacter["acLength"];
};

export default function DataTableActivityOptions({
  acLength,
  table,
  highlightAcLength,
  setHighlightAcLength,
  setHighlightIndices,
}: DataTableActivityProps) {
  return (
    <div className="flex flex-col gap-6 items-center sm:items-start w-full">
      <DataTableThreadsCalendarFilter table={table} />

      {acLength && (
        <div className="flex flex-col gap-4 p-4 border border-input rounded-md">
          <div className="flex items-center gap-2">
            <Switch
              className="h-4 w-9"
              thumbClassName="h-3 w-3"
              id="highlight-ac-length"
              onCheckedChange={() => setHighlightAcLength(!highlightAcLength)}
              checked={highlightAcLength}
            />
            <Label
              htmlFor="highlight-ac-length"
              className="text-sm font-normal"
            >
              Highlight AC length threads
            </Label>
          </div>

          <HighlighterOptions table={table} onChange={setHighlightIndices} />
        </div>
      )}
    </div>
  );
}
