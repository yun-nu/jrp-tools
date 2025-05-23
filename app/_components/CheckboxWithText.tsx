"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "./ui/Checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/Form";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  description?: string;
};

export default function CheckboxWithText({
  fieldTitle,
  nameInSchema,
  description,
}: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{fieldTitle}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
