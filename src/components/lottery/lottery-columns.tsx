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
import { MoreVertical, Trash2, Eye, Trophy } from "lucide-react";

export interface Lottery {
  id: string;
  title: string;
  drawDate: string;
  participants: number;
  status: "active" | "inactive" | "completed";
  prize: string;
  image?: string;
}

export const lotteryColumns: ColumnDef<Lottery>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("title")}</span>
        <span className="text-xs text-muted-foreground">{row.original.prize}</span>
      </div>
    ),
  },
  {
    accessorKey: "drawDate",
    header: "Draw Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("drawDate")}</span>
    ),
  },
  {
    accessorKey: "participants",
    header: "Total Participants",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("participants")}</span>
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
            status === "active"
              ? "default"
              : status === "completed"
              ? "secondary"
              : "outline"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    meta: {
      headerClassName: "text-right",
    },
    cell: () => {
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
                <Trophy className="mr-2 h-4 w-4" />
                Pick Winner
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
