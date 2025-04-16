import { Table } from "@tanstack/react-table";
import "@tanstack/table-core";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

type CustomColumnMeta = {
  name?: string;
  showColumn?: boolean;
};

declare module "@tanstack/table-core" {
  interface ColumnMeta<
    TData extends import("@tanstack/table-core").RowData,
    TValue
  > extends CustomColumnMeta {}
}

export default function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.columnDef.meta?.showColumn)
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.columnDef.meta?.name ?? column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
