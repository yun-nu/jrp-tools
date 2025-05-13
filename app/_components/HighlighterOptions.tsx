import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useCharacter } from "../_providers/CharacterProvider";
import {
  findAllSubsetsWithItemRange,
  pickSubsetByFewestItemsAndMinimalSum,
} from "../_utils/util-functions";
import { Button } from "./ui/Button";

interface SubsetHighlighterProps<TData> {
  table: Table<TData>;
  onChange: (indices: number[]) => void;
}

export default function HighlighterOptions<TData>({
  table,
  onChange,
}: SubsetHighlighterProps<TData>) {
  const { acLength, minThreadsAc: min, maxThreadsAc: max } = useCharacter();

  const minThreadsAc = min ?? 1;
  const maxThreadsAc = max ?? 1;

  const [subsetMode, setSubsetMode] = useState<"smallest" | "acLength">(
    "smallest"
  );

  const tableRowsSnapshot = JSON.stringify(
    table.getRowModel().rows.map((row) => ({
      commentCount: row.getValue("commentCount"),
      usedForAc: row.getValue("usedForAc"),
    }))
  );

  useEffect(() => {
    const notUsedForAc = table
      .getRowModel()
      .rows.map((row, i) => ({ row, i }))
      .filter(({ row }) => !row.getValue("usedForAc"));

    const indexMap = notUsedForAc.map(({ i }) => i);
    const nums = notUsedForAc.map(({ row }) =>
      row.getValue("commentCount")
    ) as number[];

    if (!nums.length || acLength == null) {
      onChange([]);
      return;
    }

    const allSubsets = findAllSubsetsWithItemRange(
      nums,
      acLength,
      minThreadsAc,
      maxThreadsAc
    );

    let pickedSubset: number[] = [];
    if (subsetMode === "smallest") {
      pickedSubset =
        pickSubsetByFewestItemsAndMinimalSum(nums, allSubsets) ?? [];
    } else if (subsetMode === "acLength") {
      if (acLength !== null) {
        pickedSubset = nums
          .map((value, idx) => (value >= acLength ? idx : null))
          .filter((idx): idx is number => idx !== null);
      } else {
        pickedSubset = [];
      }
    }

    const highlightIndices = pickedSubset.map((i) => indexMap[i]);
    onChange(highlightIndices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowsSnapshot, subsetMode]);

  return (
    <div className="flex justify-between gap-4">
      <Button
        variant={subsetMode === "smallest" ? "default" : "outline"}
        size="sm"
        onClick={() => setSubsetMode("smallest")}
      >
        Smallest sum
      </Button>
      <Button
        variant={subsetMode === "acLength" ? "default" : "outline"}
        size="sm"
        onClick={() => setSubsetMode("acLength")}
      >
        AC Length
      </Button>
    </div>
  );
}
