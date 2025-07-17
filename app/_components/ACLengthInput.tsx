"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";

type Props = {
  fieldTitle: string;
  acInSchema: string;
  minThreadsAc: string;
  maxThreadsAc: string;
};

export function ACLengthInput({
  fieldTitle,
  acInSchema,
  minThreadsAc,
  maxThreadsAc,
}: Props) {
  const form = useFormContext();

  const fields = [
    {
      name: acInSchema,
      placeholder: "AC#",
    },
    {
      name: minThreadsAc,
      placeholder: "min",
    },
    {
      name: maxThreadsAc,
      placeholder: "max",
    },
  ];

  return (
    <div className="space-y-2">
      <FormLabel className="text-sm" htmlFor={fieldTitle}>
        {fieldTitle}
      </FormLabel>
      <FormDescription>
        If provided, threads will be automatically marked as AC length when the
        comment count is reached.
      </FormDescription>
      <div className="flex items-center gap-2 w-fit text-sm">
        {fields.map((fieldConfig, i) => (
          <span key={fieldConfig.name} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormControl>
                  <Input
                    className="w-full text-sm text-center max-w-14"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    type="number"
                    placeholder={fieldConfig.placeholder}
                  />
                </FormControl>
              )}
            />
            {/* Labels after fields */}
            {i === 0 && "comments between"}
            {i === 1 && "and"}
            {i === 2 && "threads."}
          </span>
        ))}
      </div>
      <FormMessage />
    </div>
  );
}
