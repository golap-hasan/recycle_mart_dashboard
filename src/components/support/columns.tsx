"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, MessageSquare, CheckCircle, UserPlus } from "lucide-react";

export interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  userName: string;
  userEmail: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  category: string;
  createdDate: string;
  assignedTo?: string;
}

export const supportColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketId",
    header: "Ticket ID",
    cell: ({ row }) => (
      <span className="font-mono font-medium text-sm">
        {row.getValue("ticketId")}
      </span>
    ),
  },
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
          <span className="text-xs text-muted-foreground">{ticket.userEmail}</span>
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
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return (
        <Badge
          variant={
            priority === "Urgent"
              ? "destructive"
              : priority === "High"
              ? "default"
              : "secondary"
          }
          className="capitalize"
        >
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Resolved"
              ? "default"
              : status === "In Progress"
              ? "outline"
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
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Reply to Ticket
              </DropdownMenuItem>
              {!ticket.assignedTo && (
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign to Me
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Close Ticket
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
