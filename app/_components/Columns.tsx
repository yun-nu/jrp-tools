"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Copy,
  Edit,
  LinkIcon,
  MoreHorizontal,
  PanelBottomOpen,
  SquareCheckBig,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Thread } from "../_schemas/Thread";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import DeleteThread from "./DeleteThread";
import DataTableRowActions from "./DataTableRowActions";

export const threadsCols: ColumnDef<Thread>[] = [
  {
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.getValue("date");
      const formattedDate = format(new Date(date as string), "MMM dd");

      return <div className="text-right font-medium">{formattedDate}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "url",
    header: () => <div className="text-right">URL</div>,
    cell: ({ row }) => {
      const url = row.getValue("url");
      return <div className="text-right font-medium">{url as string}</div>;
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
    id: "actions",
    cell: ({ row }) => {
      const thread = row.original;
      return <DataTableRowActions thread={thread} />;
    },
  },
];
