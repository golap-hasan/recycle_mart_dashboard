"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, getInitials } from "@/lib/utils";
import { Subscribers } from "@/types/subscribers.type";

export const subscribersColumns: ColumnDef<Subscribers>[] = [
  {
    accessorKey: "user.name",
    header: "Subscriber",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "plan.name",
    header: "Current Plan",
    cell: ({ row }) => {
      const plan = row.original.plan;
      const price = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: plan.currency,
        minimumFractionDigits: 0,
      }).format(plan.price);

      return (
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit mb-1 border-primary/20 text-primary bg-primary/5">
            {plan.name}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">
             {price} / {plan.durationUnit.toLowerCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === "ACTIVE" ? "default" : "destructive"}
          className="capitalize shadow-sm"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "renewsAt",
    header: "Renews At",
    cell: ({ row }) => {
      const date = row.original.renewsAt;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{formatDate(date)}</span>
          {row.original.autoRenew && (
            <span className="text-[10px] text-foreground font-semibold bg-green-200 dark:bg-green-800 px-1.5 py-0.5 rounded w-fit mt-0.5">
              Auto-Renew On
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "credits",
    header: "Credits Usage",
    cell: ({ row }) => (
       <div className="text-sm">
         <span className="font-semibold">{row.original.credits}</span> Used
       </div>
    ),
  },
];
