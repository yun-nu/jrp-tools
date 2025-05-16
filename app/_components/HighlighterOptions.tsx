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
import { subMonths, isSameMonth } from "date-fns";

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

  const tableRowsSnapshot = JSON.stringify(
    table.getRowModel().rows.map((row) => row.original)
  );

  useEffect(() => {
    // Filter threads that are not used for AC...
    const notUsedForAc = table
      .getRowModel()
      .rows.map((row, i) => ({
        thread: row.original,
        i,
      }))
      .filter(({ thread }) => !thread.usedForAc);

    const now = new Date();
    const prevMonth = subMonths(now, 1);

    // ... and are from the current or previous month
    const threads = notUsedForAc
      .map(({ thread }) => thread)
      .filter((t) => {
        const d = new Date(t.date);
        return isSameMonth(d, now) || isSameMonth(d, prevMonth);
      });

    // Get the indices of the threads that are not used for AC
    const indexMap = notUsedForAc
      .map(({ i }, idx) =>
        threads.includes(notUsedForAc[idx].thread) ? i : null
      )
      .filter((i) => i !== null) as number[];

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
