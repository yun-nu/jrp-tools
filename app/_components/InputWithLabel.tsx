"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  description?: string;
  placeholder?: string;
  onBlur?: () => void;
};

export function InputWithLabel({
  fieldTitle,
  nameInSchema,
  description,
  placeholder,
  onBlur,
}: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm" htmlFor={fieldTitle}>
            {fieldTitle}
          </FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}

          <div className="flex items-center gap-2 w-full max-w-xs">
            <div className="w-full max-w-xs flex items-center rounded-md border">
              <FormControl>
                <Input
                  {...field}
                  id={fieldTitle}
                  className="w-full max-w-xs text-sm"
                  placeholder={placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={onBlur}
                />
              </FormControl>
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
