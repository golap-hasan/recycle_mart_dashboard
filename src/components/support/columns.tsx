"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export interface Ticket {
  id: string;
  subject: string;
  userName: string;
  userEmail: string;
  status: "Pending" | "Closed";
  category: string;
  createdDate: string;
  assignedTo?: string;
}

export const supportColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <span className="font-medium max-w-[250px] truncate block">
        {row.getValue("subject")}
      </span>
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{ticket.userName}</span>
          <span className="text-xs text-muted-foreground">
            {ticket.userEmail}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Closed"
              ? "default"
              : "secondary"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.getValue("createdDate")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => {
      return (
        <div className="text-right">
          <Button variant="ghost" size="icon-sm">
            <MessageSquare />
          </Button>
        </div>
      );
    },
  },
];
