"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/types/support.type";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const supportColumns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">
        {row.getValue("subject")}
      </span>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] truncate cursor-help text-muted-foreground italic">
                &quot;{message}&quot;
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[400px] p-3 wrap-break-word">
              <p className="text-sm">{message}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {format(new Date(row.original.createdAt), "dd/MM/yyyy")}
      </span>
    ),
  }
];
