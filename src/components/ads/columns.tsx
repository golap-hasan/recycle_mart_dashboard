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
import { MoreVertical, Trash2, Eye, CheckCircle, XCircle, Star } from "lucide-react";

export interface Ad {
  id: string;
  title: string;
  seller: string;
  category: string;
  location: string;
  price: number;
  condition: "New" | "Used" | "Refurbished";
  status: "pending" | "approved" | "rejected" | "expired";
  postedDate: string;
  views: number;
}

export const adsColumns: ColumnDef<Ad>[] = [
  {
    accessorKey: "title",
    header: "Ad Title",
    cell: ({ row }) => (
      <span className="font-medium max-w-[300px] truncate block">
        {row.getValue("title")}
      </span>
    ),
  },
  {
    accessorKey: "seller",
    header: "Seller",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("seller")}</span>
    ),
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <span className="font-semibold">
          ৳ {price.toLocaleString("en-BD")}
        </span>
      );
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const condition = row.getValue("condition") as string;
      return (
        <Badge
          variant={condition === "New" ? "default" : "secondary"}
          className="capitalize"
        >
          {condition}
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
            status === "approved"
              ? "default"
              : status === "pending"
              ? "outline"
              : status === "rejected"
              ? "destructive"
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
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("views")} views
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const ad = row.original;
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
              {ad.status === "pending" && (
                <>
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Ad
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Ad
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Feature Ad
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Ad
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
