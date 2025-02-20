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
} from "./ui/Dropdown-menu";

export const threadsCols: ColumnDef<Thread>[] = [
  {
    accessorKey: "date",
    //header: () => <div className="text-right">Date</div>,
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <PanelBottomOpen />
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={thread.url ? thread.url : "#"}
              >
                Open Thread
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(thread.url as string)
              }
            >
              <LinkIcon /> Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SquareCheckBig /> Toggle finished
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit /> Edit thread
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy /> Duplicate thread
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <Trash />
              Delete Thread
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
