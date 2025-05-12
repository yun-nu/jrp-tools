import { useState, ChangeEvent } from "react";

export function useNumberInput(initial = undefined) {
  const [value, setValue] = useState(String(initial) ?? "");
  const [number, setNumber] = useState(initial ?? 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (val === "") return;

    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) setNumber(parsed);
  };

  const setBoth = (num: number) => {
    setNumber(num);
    setValue(String(num));
  };

  return { value, number, setValue, setNumber: setBoth, handleChange };
}
