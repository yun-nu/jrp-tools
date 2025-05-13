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
        <FormField
          control={form.control}
          name={acInSchema}
          render={({ field }) => (
            <FormControl>
              <Input
                className="w-full text-sm text-center max-w-14"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                type="number"
                placeholder="AC#"
              />
            </FormControl>
          )}
        />
        comments between
        <FormField
          control={form.control}
          name={minThreadsAc}
          render={({ field }) => (
            <FormControl>
              <Input
                className="w-full text-sm text-center max-w-14"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                type="number"
                placeholder="min"
              />
            </FormControl>
          )}
        />
        and
        <FormField
          control={form.control}
          name={maxThreadsAc}
          render={({ field }) => (
            <FormControl>
              <Input
                className="w-full text-sm text-center max-w-14"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                type="number"
                placeholder="max"
              />
            </FormControl>
          )}
        />
        threads.
      </div>
      <FormMessage />
    </div>
  );
}
