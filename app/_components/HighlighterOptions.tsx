import { Table } from "@tanstack/react-table";
import { isWithinInterval, startOfMonth, subMonths } from "date-fns";
import { CircleX } from "lucide-react";
import { useEffect } from "react";
import useLocalStorage from "../_hooks/useLocalStorage";
import { useNumberInput } from "../_hooks/useNumberInput";
import { useCharacter } from "../_providers/CharacterProvider";
import { ExistingThread } from "../_schemas/Thread";
import {
  findThreadSubsetsByCommentRange,
  pickBestThreadSubsetByFewestItemsAndCommentSum,
} from "../_utils/util-functions";
import { TooltipWrapperButton } from "./TooltipWrappers";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface SubsetHighlighterProps {
  table: Table<ExistingThread>;
  onChange: (indices: number[]) => void;
}

export default function HighlighterOptions({
  table,
  onChange,
}: SubsetHighlighterProps) {
  const { acLength, minThreadsAc: min, maxThreadsAc: max } = useCharacter();

  const {
    value: inputMonths,
    number: months,
    handleChange,
    reset,
  } = useNumberInput(0);

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

    // ... and are from the the specified month range
    const threads = notUsedForAc
      .map(({ thread }) => thread)
      .filter((t) => {
        const d = new Date(t.date);
        if (!months || months === 0) {
          // Only current month
          return isWithinInterval(d, {
            start: startOfMonth(now),
            end: now,
          });
        }
        // Current month + previous N full months
        return isWithinInterval(d, {
          start: startOfMonth(subMonths(now, months)),
          end: now,
        });
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
  }, [tableRowsSnapshot, subsetMode, months]);

  return (
    <div className="flex flex-col gap-6">
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
      <div className="flex items-center gap-2 text-sm">
        Threads from the past{" "}
        <Input
          value={inputMonths}
          type="number"
          onChange={handleChange}
          className="w-12 text-center"
          placeholder="0"
          max={12}
          min={0}
        />{" "}
        month(s)
        <TooltipWrapperButton
          icon={CircleX}
          onClick={reset}
          text="Reset month range"
        ></TooltipWrapperButton>
      </div>
    </div>
  );
}
