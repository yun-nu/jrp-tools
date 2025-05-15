import { Table } from "@tanstack/react-table";
import { useEffect } from "react";
import useLocalStorage from "../_hooks/useLocalStorage";
import { useCharacter } from "../_providers/CharacterProvider";
import { ExistingThread } from "../_schemas/Thread";
import {
  findThreadSubsetsByCommentRange,
  pickBestThreadSubsetByFewestItemsAndCommentSum,
} from "../_utils/util-functions";
import { Button } from "./ui/Button";

interface SubsetHighlighterProps {
  table: Table<ExistingThread>;
  onChange: (indices: number[]) => void;
}

export default function HighlighterOptions({
  table,
  onChange,
}: SubsetHighlighterProps) {
  const { acLength, minThreadsAc: min, maxThreadsAc: max } = useCharacter();

  const minThreadsAc = min ?? 1;
  const maxThreadsAc = max ?? 1;

  const [subsetMode, setSubsetMode] = useLocalStorage<
    "oldest" | "newest" | "acLength"
  >("subsetMode", "oldest");

  // Check if the table has the usedForAc column (guard against runtime error for OOC tab)
  // const hasUsedForAcColumn = table
  //   .getAllColumns()
  //   .some((col) => col.id === "usedForAc");

  // const tableRowsSnapshot = JSON.stringify(
  //   table.getRowModel().rows.map((row) => {
  //     const commentCount = row.getValue("commentCount");

  //     if (!hasUsedForAcColumn) return { commentCount };
  //     return { commentCount, usedForAc: row.getValue("usedForAc") };
  //   })
  // );

  const checkColumns = ["usedForAc", "commentCount"];

  const tableRowsSnapshot = JSON.stringify(
    table.getRowModel().rows.map((row) => {
      const snapshot: Record<string, unknown> = {};
      table.getAllColumns().forEach((col) => {
        if (!checkColumns.includes(col.id)) {
          snapshot[col.id] = row.getValue(col.id);
        }
      });
      return snapshot;
    })
  );

  useEffect(() => {
    const notUsedForAc = table
      .getRowModel()
      .rows.map((row, i) => ({
        thread: row.original,
        i,
      }))
      .filter(({ thread }) => !thread.usedForAc);

    const threads = notUsedForAc.map(({ thread }) => thread);
    const indexMap = notUsedForAc.map(({ i }) => i);

    if (!threads.length || acLength == null) {
      onChange([]);
      return;
    }

    const allSubsets = findThreadSubsetsByCommentRange(
      threads as ExistingThread[],
      acLength,
      minThreadsAc,
      maxThreadsAc
    );

    let pickedSubset: typeof threads = [];
    if (subsetMode === "oldest") {
      pickedSubset =
        pickBestThreadSubsetByFewestItemsAndCommentSum(allSubsets) ?? [];
    }
    if (subsetMode === "newest") {
      pickedSubset =
        pickBestThreadSubsetByFewestItemsAndCommentSum(allSubsets, "newest") ??
        [];
    }
    if (subsetMode === "acLength") {
      pickedSubset = threads.filter((t) => t.commentCount >= acLength);
    }

    const highlightIndices = pickedSubset
      .map((thread) => threads.findIndex((t) => t.id === thread.id))
      .map((i) => indexMap[i]);

    onChange(highlightIndices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowsSnapshot, subsetMode]);

  return (
    <div className="flex gap-4">
      <Button
        variant={subsetMode === "oldest" ? "default" : "outline"}
        size="sm"
        onClick={() => setSubsetMode("oldest")}
      >
        Oldest
      </Button>
      <Button
        variant={subsetMode === "newest" ? "default" : "outline"}
        size="sm"
        onClick={() => setSubsetMode("newest")}
      >
        Newest
      </Button>
      <Button
        variant={subsetMode === "acLength" ? "default" : "outline"}
        size="sm"
        onClick={() => setSubsetMode("acLength")}
      >
        {acLength} comments
      </Button>
    </div>
  );
}
