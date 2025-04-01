"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, LinkIcon } from "lucide-react";
import { ExistingThread } from "../_schemas/Thread";
import DataTableRowActions from "./DataTableRowActions";
import StyledLink from "./StyledLink";
import { Button } from "./ui/Button";

export const threadsCols: ColumnDef<ExistingThread>[] = [
  {
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.getValue("date");
      const isCurrentYear =
        (date as string).slice(0, 4) === String(new Date().getFullYear());

      const formattedDate = isCurrentYear
        ? format(new Date(date as string), "MMM dd")
        : format(new Date(date as string), "MMM dd yyyy");

      return <div className="pl-4 text-muted-foreground">{formattedDate}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2"
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("type")}</div>
    ),
  },
  {
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
    id: "actions",
    cell: ({ row }) => {
      const thread = row.original;
      return (
        <div className="text-right">
          <DataTableRowActions thread={thread} />
        </div>
      );
    },
    enableHiding: true,
  },
];
