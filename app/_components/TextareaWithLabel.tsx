"use client";

import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/Form";
import { Textarea } from "./ui/Textarea";
import { useFormContext } from "react-hook-form";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
};

export default function TextareaWithLabel({ fieldTitle, nameInSchema }: Props) {
  const form = useFormContext();
  const textValue = form.watch(nameInSchema as string);

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Maximum of 500 characters"
              className="max-w-xs min-h-32 resize"
              {...field}
            />
          </FormControl>
          <FormDescription>
            Length: {textValue.length} characters
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
