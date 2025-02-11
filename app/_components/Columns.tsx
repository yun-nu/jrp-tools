"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const threadsCols: ColumnDef<Threads>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date = row.getValue("date");
      const formattedDate = format(new Date(date as string), "MMM dd");

      return <div className="text-right font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "url",
    header: () => <div className="text-right">URL</div>,
    cell: ({ row }) => {
      const url = row.getValue("url");
      return <div className="text-right font-medium">{url}</div>;
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
];
