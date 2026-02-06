"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoreVertical } from "lucide-react";
import { Contact } from "@/types/support.type";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CellAction = ({ data }: { data: Contact }) => {
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
            <MessageSquare className="mr-2 h-4 w-4" />
            Reply
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const supportColumns: ColumnDef<Contact>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[300px]">
        <span className="font-semibold text-primary">
          {row.getValue("subject")}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-2" title={row.original.message}>
          {row.original.message}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{contact.name}</span>
          <span className="text-xs text-muted-foreground">
            {contact.email}
          </span>
          <span className="text-xs text-muted-foreground">
            {contact.phone}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isReplied",
    header: "Status",
    cell: ({ row }) => {
      const isReplied = row.getValue("isReplied") as boolean;
      return (
        <Badge
          variant={isReplied ? "default" : "secondary"}
          className="capitalize"
        >
          {isReplied ? "Replied" : "Pending"}
        </Badge>
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
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
