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
import { MoreVertical, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import AdDetailsDialog from "./AdDetailsDialog";
import { Ad } from "@/types/ads.type";
import { approveAd, deleteAd } from "@/services/ads";
import { toast } from "sonner";
import { useState } from "react";
import { RejectAdModal } from "./RejectAdModal";

const ActionCell = ({ ad }: { ad: Ad }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const handleApprove = async () => {
    setLoading("approve");
    const res = await approveAd(ad._id);
    if (res.success) {
      toast.success("Ad approved successfully");
    } else {
      toast.error(res.message || "Failed to approve ad");
    }
    setLoading(null);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    setLoading("delete");
    const res = await deleteAd(ad._id);
    if (res.success) {
      toast.success("Ad deleted successfully");
    } else {
      toast.error(res.message || "Failed to delete ad");
    }
    setLoading(null);
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!!loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AdDetailsDialog ad={ad} />
          {ad.status === "PENDING" && (
            <>
              <DropdownMenuItem onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Ad
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => setIsRejectModalOpen(true)}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject Ad
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Ad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RejectAdModal
        adId={ad._id}
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
      />
    </div>
  );
};

export const adsColumns: ColumnDef<Ad>[] = [
  {
    accessorKey: "title",
    header: "Ad Title",
    cell: ({ row }) => (
      <span className="font-medium max-w-[300px] truncate block">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: "user.name",
    header: "Seller",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.user.name}</span>
    ),
  },
  {
    accessorKey: "categoryId.name",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.categoryId?.name || "N/A"}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
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
      const condition = row.original.condition;
      return (
        <Badge className="capitalize">
          {condition}
        </Badge>
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
          variant={
            status === "ACTIVE"
              ? "default"
              : status === "PENDING"
              ? "outline"
              : status === "REJECTED"
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
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionCell ad={row.original} />,
  },
];
