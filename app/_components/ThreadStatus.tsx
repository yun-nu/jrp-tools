import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  description?: string;
};

export default function ThreadStatus({
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
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <Select
            defaultValue={field.value ?? "ongoing"}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="finished">Finished</SelectItem>
              <SelectItem value="dropped">Dropped</SelectItem>
              <SelectItem value="ooc">OOC</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-1 leading-none">
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
