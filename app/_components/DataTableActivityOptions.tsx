"use client";

import { Table } from "@tanstack/react-table";
import { ExistingCharacter } from "../_schemas/Character";
import DataTableThreadsCalendarFilter from "./DataTableThreadsCalendarFilter";
import HighlighterOptions from "./HighlighterOptions";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";
import { useCharacter } from "../_providers/CharacterProvider";

type DataTableActivityProps<TData> = {
  table: Table<TData>;
  highlightAcLength: boolean;
  setHighlightAcLength: (newValue: boolean) => void;
  setHighlightIndices: (indices: number[]) => void;
  acLength: ExistingCharacter["acLength"];
};

export default function DataTableActivityOptions<TData>({
  acLength,
  table,
  highlightAcLength,
  setHighlightAcLength,
  setHighlightIndices,
}: DataTableActivityProps<TData>) {
  const nums = table
    .getRowModel()
    .rows.map((row) => row.getValue("commentCount")) as number[];

  return (
    <div className="flex flex-col gap-6 items-center sm:items-start">
      <DataTableThreadsCalendarFilter table={table} />

      {acLength && (
        <div className="flex flex-col items-center gap-4">
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

          <HighlighterOptions nums={nums} onChange={setHighlightIndices} />
        </div>
      )}
    </div>
  );
}
