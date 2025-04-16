"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, LinkIcon } from "lucide-react";
import { ExistingThread } from "../_schemas/Thread";
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
          className="flex items-center gap-2 p-0"
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
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
        <div className="whitespace-pre-wrap break-words text-sm">
          {row.getValue("blurb")}
        </div>
      );
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
