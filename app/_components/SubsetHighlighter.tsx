import { useEffect, useState } from "react";
import { ExistingCharacter } from "../_schemas/Character";
import {
  findAllSubsetsWithItemRange,
  pickSubsetByFewestItemsAndMinimalSum,
} from "../_utils/util-functions";
import { Button } from "./ui/Button";

interface SubsetHighlighterProps {
  nums: number[];
  acLength: ExistingCharacter["acLength"];
  minItems: number;
  maxItems: number;
  onChange: (indices: number[]) => void;
}

export default function SubsetHighlighter({
  nums,
  acLength,
  minItems,
  maxItems,
  onChange,
}: SubsetHighlighterProps) {
  const [subsetMode, setSubsetMode] = useState<"smallest" | "acLength">(
    "smallest"
  );
  let pickedSubset: number[] = [];

  const allSubsets = findAllSubsetsWithItemRange(
    nums,
    acLength,
    minItems,
    maxItems
  );

  if (subsetMode === "smallest") {
    pickedSubset = pickSubsetByFewestItemsAndMinimalSum(nums, allSubsets) ?? [];
  } else if (subsetMode === "acLength") {
    if (acLength !== null) {
      pickedSubset = nums
        .map((value, idx) => (value >= acLength ? idx : null))
        .filter((idx): idx is number => idx !== null);
    } else {
      pickedSubset = [];
    }
  }

  useEffect(() => {
    onChange(pickedSubset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pickedSubset)]);

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
