"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { LotteryActions } from "./LotteryActions";
import { format } from "date-fns";
import { Lottery } from "@/types/lottery.type";

export const lotteryColumns: ColumnDef<Lottery>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("title")}</span>
        <span className="text-xs text-muted-foreground">{row.original.prize || "No Prize Info"}</span>
      </div>
    ),
  },
  {
    accessorKey: "drawDate",
    header: "Draw Date",
    cell: ({ row }) => {
      const date = row.getValue("drawDate");
      return (
        <span className="text-muted-foreground">
          {date ? format(new Date(date as string), "dd/MM/yyyy") : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "ticketPrice",
    header: "Ticket Price",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("ticketPrice")} BDT</span>
    ),
  },
  {
    accessorKey: "participantsCount",
    header: "Participants",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("participantsCount")}</span>
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
            status === "ACTIVE"
              ? "default"
              : status === "COMPLETED"
              ? "secondary"
              : "outline"
          }
          className="capitalize"
        >
          {status.toLowerCase()}
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
    cell: ({ row }) => {
      return <LotteryActions lottery={row.original} />;
    },
  },
];
