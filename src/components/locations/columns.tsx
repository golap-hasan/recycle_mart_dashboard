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
import { MoreVertical, Trash2, Edit, MapPin } from "lucide-react";

export interface Location {
  id: string;
  division: string;
  district: string;
  area: string;
  postcode: string;
  activeAds: number;
  status: "active" | "inactive";
}

export const locationsColumns: ColumnDef<Location>[] = [
  {
    accessorKey: "division",
    header: "Division",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("division")}</span>
    ),
  },
  {
    accessorKey: "district",
    header: "District",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("district")}</span>
    ),
  },
  {
    accessorKey: "area",
    header: "Area",
    cell: ({ row }) => {
      const location = row.original;
      return (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{location.area}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "postcode",
    header: "Postcode",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("postcode")}</Badge>
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
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const location = row.original;
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
                Edit Location
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MapPin className="mr-2 h-4 w-4" />
                Manage Areas
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Location
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
