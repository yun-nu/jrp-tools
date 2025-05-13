import { useEffect, useState } from "react";
import { useCharacter } from "../_providers/CharacterProvider";
import {
  findAllSubsetsWithItemRange,
  pickSubsetByFewestItemsAndMinimalSum,
} from "../_utils/util-functions";
import { Button } from "./ui/Button";

interface SubsetHighlighterProps {
  nums: number[];
  onChange: (indices: number[]) => void;
}

export default function HighlighterOptions({
  nums,
  onChange,
}: SubsetHighlighterProps) {
  const {
    acLength,
    minThreadsAc: minItems,
    maxThreadsAc: maxItems,
  } = useCharacter();

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
