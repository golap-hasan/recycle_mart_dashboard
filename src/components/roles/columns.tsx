"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

export interface Role {
  id: string;
  name: string;
  email: string;
  role: string;
  createdDate: string;
}

export const rolesColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-[250px] truncate block">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("role")}
      </span>
    ),
  },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("createdDate")}
      </span>
    ),
  },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => {
      return (
        <div className="text-right flex gap-2 justify-end">
          <Button variant="ghost" size="icon-sm">
            <Edit />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-destructive">
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
