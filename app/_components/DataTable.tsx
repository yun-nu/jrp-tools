"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import useLocalStorage from "../_hooks/useLocalStorage";
import { ExistingCharacter } from "../_schemas/Character";
import DataTableActivityOptions from "./DataTableActivityOptions";
import DataTableViewOptions from "./DataTableViewOptions";
import { TooltipWrapperButton } from "./TooltipWrappers";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showActions?: boolean;
  acLength: ExistingCharacter["acLength"];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  showActions = false,
  acLength,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    actions: showActions,
    commentCount: showActions,
    usedForAc: showActions,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const [highlightAcLength, setHighlightAcLength] = useLocalStorage(
    "highlightAcLength",
    false
  );

  const [minComments, setMinComments] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _, filterValue) => {
      const terms: string[] = filterValue
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const fieldsToSearch = ["type", "blurb", "threadPartner"];

      return terms.every((term) =>
        fieldsToSearch.some((field) => {
          const value = row.getValue(field);
          return String(value ?? "")
            .toLowerCase()
            .includes(term);
        })
      );
    },
  });

  return (
    <>
      <div className="flex items-end sm:items-center justify-between gap-4 py-6 flex-col-reverse sm:flex-row">
        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <Input
            className="text-sm w-full sm:max-w-[300px]"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <TooltipWrapperButton
            icon={CircleX}
            onClick={() => setGlobalFilter("")}
            text={"Clear search"}
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-muted px-2 sm:px-8 text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    acLength &&
                    showActions &&
                    parseInt(row.getValue("commentCount")) >= acLength &&
                    highlightAcLength
                      ? "bg-green-700/30"
                      : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-2 sm:px-8 text-center [&:has([role=checkbox])]:pr-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No threads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center sm:items-start justify-between gap-6 py-6 flex-col-reverse sm:flex-row">
        {showActions && (
          <DataTableActivityOptions
            table={table}
            dateRange={dateRange}
            minComments={minComments}
            setDateRange={setDateRange}
            setMinComments={setMinComments}
            highlightAcLength={highlightAcLength}
            setHighlightAcLength={setHighlightAcLength}
          />
        )}

        <div className="flex items-center justify-end space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-full sm:w-fit"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-full sm:w-fit"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
