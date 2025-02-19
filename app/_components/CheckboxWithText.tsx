"use client";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/Form";
import { useFormContext } from "react-hook-form";

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
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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

// export function CheckboxWithText({ value }) {
//   return (
//     <div className="items-top flex space-x-2">
//       <Checkbox id="terms1" />
//       <div className="grid gap-1.5 leading-none">
//         <label
//           htmlFor="terms1"
//           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//         >
//           Accept terms and conditions
//         </label>
//         <p className="text-sm text-muted-foreground">
//           You agree to our Terms of Service and Privacy Policy.
//         </p>
//       </div>
//     </div>
//   );
// }
