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
import useLocalStorage from "../_hooks/useLocalStorage";
import { useEffect } from "react";

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
  const tableColumns = table
    .getAllColumns()
    .filter((column) => column.columnDef.meta?.showColumn);
  const [visibleColumns, setVisibleColumns] = useLocalStorage(
    "selectedColumns",
    tableColumns.filter((col) => col.getIsVisible()).map((col) => col.id)
  );

  useEffect(() => {
    tableColumns.forEach((column) => {
      column.toggleVisibility(visibleColumns.includes(column.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {tableColumns.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={visibleColumns.includes(column.id)}
              onCheckedChange={(checked) => {
                checked
                  ? setVisibleColumns([...visibleColumns, column.id])
                  : setVisibleColumns(
                      visibleColumns.filter((id) => id !== column.id)
                    );
              }}
            >
              {column.columnDef.meta?.name ?? column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
