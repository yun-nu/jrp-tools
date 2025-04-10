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
  className?: string;
};

export default function TextareaWithLabel({
  fieldTitle,
  nameInSchema,
  placeholder,
  maxLength,
  className,
}: Props) {
  const form = useFormContext();
  const textValue = form.watch(nameInSchema as string);
  const limitReached = textValue.length > maxLength;
  const charactersLeft = maxLength - textValue.length;

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
              className={`max-w-xs min-h-32 resize ${className}`}
              {...field}
            />
          </FormControl>
          <FormDescription>
            {limitReached
              ? `Maximum length exceeded. Remove ${
                  textValue.length - maxLength
                } characters.`
              : `${charactersLeft} characters left `}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
