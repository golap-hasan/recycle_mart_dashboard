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
import { MoreVertical, Trash2, Edit, FolderTree } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategoryCount: number;
  activeAds: number;
  status: "active" | "inactive";
  createdDate: string;
}

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <span className="font-medium">{category.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "subcategoryCount",
    header: "Subcategories",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("subcategoryCount")} subcategories
      </span>
    ),
  },
  {
    accessorKey: "activeAds",
    header: "Active Ads",
    cell: ({ row }) => {
      const count = row.getValue("activeAds") as number;
      return (
        <Badge variant="secondary" className="font-semibold">
          {count.toLocaleString()} ads
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
          variant={status === "active" ? "default" : "secondary"}
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
      <span className="text-muted-foreground">
        {row.getValue("createdDate")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const category = row.original;
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
                <FolderTree className="mr-2 h-4 w-4" />
                View Subcategories
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Category
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
