"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
export type Package = {
  id: string;
  name: string;
  price: number;
  duration: string;
  ads: number;
  status: "active" | "inactive";
};

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "name",
    header: "Package Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("duration")}</div>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("features")} Ads/Month
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
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
          <Button variant="ghost" size="icon-sm" aria-label="Edit Package">
            <Edit />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
