import { useState, ChangeEvent } from "react";

export function useNumberInput(initial = undefined) {
  const [value, setValue] = useState(String(initial) ?? "");
  const [number, setNumber] = useState<number | undefined>(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (val.startsWith("-")) val = val.replace("-", "");
    if (val.startsWith("0") && val.length > 1) val = val.replace(/^0+/, "");

    setValue(val);

    if (val === "") return;

    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) setNumber(parsed);
  };

  const setBoth = (num: number | undefined) => {
    setNumber(num);
    setValue(String(num));
  };

  return { value, number, setValue, setNumber: setBoth, handleChange };
}
