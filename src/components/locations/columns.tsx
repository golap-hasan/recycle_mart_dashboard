"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {  Trash2, Edit, MapPin } from "lucide-react";

export interface Location {
  id: string;
  division: string;
  area: string;
  activeAds: number;
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
    header: () => <div className="text-right">Actions</div>,
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Edit">
            <Edit />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Delete"
            className="text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
