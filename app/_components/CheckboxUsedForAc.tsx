"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useToggleUsedForAc } from "../_hooks/threads/useUsedForAc";
import { ExistingThread } from "../_schemas/Thread";
import { Checkbox } from "./ui/Checkbox";

export default function CheckboxUsedForAc({
  row,
}: {
  row: Row<ExistingThread>;
}) {
  const [checked, setChecked] = useState(row.getValue("usedForAc") as boolean);
  const { toggleUsedForAc } = useToggleUsedForAc();

  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
    toggleUsedForAc({ threadId: row.original.id, updatedState: checked });
  };

  return (
    <Checkbox
      className="sm:h-5 sm:w-5"
      checked={checked}
      onCheckedChange={handleCheckedChange}
    />
  );
}
