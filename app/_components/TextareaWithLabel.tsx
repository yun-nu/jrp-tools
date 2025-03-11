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
import { Textarea } from "./ui/Textarea";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  placeholder?: string;
  maxLength: number;
};

export default function TextareaWithLabel({
  fieldTitle,
  nameInSchema,
  placeholder,
  maxLength,
}: Props) {
  const form = useFormContext();
  const textValue = form.watch(nameInSchema as string);
  const limitReached = textValue.length > maxLength;

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="max-w-xs min-h-32 resize"
              {...field}
            />
          </FormControl>
          <FormDescription>
            {limitReached
              ? `Maximum length exceeded. Remove ${
                  textValue.length - maxLength
                } characters.`
              : `${maxLength - textValue.length} characters left `}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
