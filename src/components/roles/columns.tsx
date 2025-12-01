"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, Edit, Users } from "lucide-react";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  canManageAds: boolean;
  canManageUsers: boolean;
  createdDate: string;
}

export const rolesColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-[250px] truncate block">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "permissions",
    header: "Key Permissions",
    cell: ({ row }) => {
      const role = row.original;
      return (
        <div className="flex gap-1 flex-wrap">
          {role.canManageAds && (
            <Badge variant="secondary" className="text-xs">
              Manage Ads
            </Badge>
          )}
          {role.canManageUsers && (
            <Badge variant="secondary" className="text-xs">
              Manage Users
            </Badge>
          )}
          {role.permissions.slice(0, 2).map((perm, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {perm}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "userCount",
    header: "Users",
    cell: ({ row }) => {
      const count = row.getValue("userCount") as number;
      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{count}</span>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const role = row.original;
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
                <Edit className="mr-2 h-4 w-4" />
                Edit Permissions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                View Users
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
