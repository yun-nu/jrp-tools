"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, LinkIcon } from "lucide-react";
import Link from "next/link";
import { Thread } from "../_schemas/Thread";
import DataTableRowActions from "./DataTableRowActions";
import { Button } from "./ui/Button";

export const threadsCols: ColumnDef<Thread>[] = [
  {
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.getValue("date");
      const isCurrentYear =
        (date as string).slice(0, 4) === String(new Date().getFullYear());

      const formattedDate = isCurrentYear
        ? format(new Date(date as string), "MMM dd")
        : format(new Date(date as string), "MMM dd yyyy");

      return formattedDate;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex"
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
          Date
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "blurb",
    header: "Blurb",
  },
  {
    accessorKey: "URL",
    header: "Link",
    cell: ({ row }) => {
      const thread = row.original;
      return (
        <div>
          {thread.url && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={thread.url ? thread.url : "#"}
            >
              <LinkIcon />
            </Link>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const thread = row.original;
      return <DataTableRowActions thread={thread} />;
    },
    enableHiding: true,
  },
];
