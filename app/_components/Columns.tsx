"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, startOfDay } from "date-fns";
import { ArrowUpDown, LinkIcon } from "lucide-react";
import { ExistingThread } from "../_schemas/Thread";
import CheckboxUsedForAc from "./CheckboxUsedForAc";
import CommentCountActions from "./CommentCountActions";
import DataTableRowActions from "./DataTableRowActions";
import StyledLink from "./StyledLink";
import { Button } from "./ui/Button";

export const threadsCols = (
  showActions: boolean
): ColumnDef<ExistingThread>[] => [
  {
    meta: {
      showColumn: true,
    },
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.getValue("date");
      const isCurrentYear =
        (date as string).slice(0, 4) === String(new Date().getFullYear());

      const formattedDate = isCurrentYear
        ? format(new Date(date as string), "MMM dd")
        : format(new Date(date as string), "MMM dd yyyy");

      return (
        <div className="text-muted-foreground lg:min-w-24">{formattedDate}</div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 p-0 mx-auto"
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      // Returns all rows if no date range is selected
      if (!filterValue?.from && !filterValue?.to) return true;

      const rowDate = startOfDay(new Date(row.getValue(columnId)));

      // Check if the row date is before the start of the range
      if (filterValue.from && rowDate < startOfDay(filterValue.from)) {
        return false;
      }

      // Check if the row date is after the end of the range
      if (filterValue.to && rowDate > startOfDay(filterValue.to)) {
        return false;
      }

      return true;
    },
  },
  {
    meta: {
      showColumn: true,
    },
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("type")}</div>
    ),
  },
  {
    meta: {
      showColumn: true,
    },
    accessorKey: "blurb",
    header: "Blurb",
    cell: ({ row }) => {
      return (
        <div className="whitespace-pre-wrap break-words text-sm text-left">
          {row.getValue("blurb")}
        </div>
      );
    },
  },
  {
    meta: {
      name: "Characters",
      showColumn: true,
    },
    accessorKey: "threadPartner",
    header: "Characters",
    cell: ({ row }) => {
      return <div>{row.getValue("threadPartner")}</div>;
    },
  },
  {
    meta: {
      name: "# Comments",
      showColumn: showActions,
    },
    accessorKey: "commentCount",
    header: () => <span className="whitespace-nowrap"># Comments</span>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <CommentCountActions row={row} />
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const value = Number(row.getValue(columnId));
      return value >= filterValue;
    },
  },
  {
    meta: {
      name: "Used for AC",
      showColumn: showActions,
    },
    accessorKey: "usedForAc",
    header: () => <span className="whitespace-nowrap">Used for AC</span>,
    cell: ({ row }) => {
      return <CheckboxUsedForAc row={row} />;
    },
  },
  {
    meta: {
      name: "Link",
      showColumn: true,
    },
    accessorKey: "URL",
    header: "Link",
    cell: ({ row }) => {
      const thread = row.original;
      return (
        <div>
          {thread.url && (
            <StyledLink type="new-window" href={thread.url ? thread.url : "#"}>
              <LinkIcon className="h-5 w-5" />
            </StyledLink>
          )}
        </div>
      );
    },
  },
  {
    meta: {
      showColumn: showActions,
    },
    id: "actions",
    cell: ({ row }) => {
      const thread = row.original;
      return (
        <div className="text-right">
          <DataTableRowActions thread={thread} />
        </div>
      );
    },
  },
];
