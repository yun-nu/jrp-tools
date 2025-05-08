import React from "react";
import { Input } from "./ui/Input";
import { MinusCircle, PlusCircle } from "lucide-react";

type CounterWithButtonsProps = {
  label: string;
  value: number;
  setValue: (v: number) => void;
  inputValue: string | number;
  setInputValue: (v: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
};

export default function CounterWithButtons({
  label,
  value,
  setValue,
  inputValue,
  setInputValue,
  handleChange,
  min = 0,
}: CounterWithButtonsProps) {
  return (
    <>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="flex items-center justify-center gap-2">
        <MinusCircle
          className="h-4 cursor-pointer hover:text-primary transition-colors"
          onClick={() => {
            const newCount = Math.max(min, value - 1);
            setValue(newCount);
            setInputValue(String(newCount));
          }}
        />
        <Input
          type="number"
          value={inputValue}
          onChange={handleChange}
          className="w-12 h-8 text-center"
        />
        <PlusCircle
          className="h-4 cursor-pointer hover:text-primary transition-colors"
          onClick={() => {
            const newCount = value + 1;
            setValue(newCount);
            setInputValue(String(newCount));
          }}
        />
      </div>
    </>
  );
}
