"use client";
import { cn } from "@/app/_utils/cn-utils";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/Button";
import { Calendar } from "./ui/Calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { format } from "date-fns";

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
  const maxDate = "2028-01-01";
  const minDate = "2023-01-01";

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{fieldTitle}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date(maxDate) || date < new Date(minDate)
                }
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
