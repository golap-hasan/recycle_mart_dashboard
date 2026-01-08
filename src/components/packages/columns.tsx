"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Plan } from "@/types/plan.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UpdatePackageModal } from "./UpdatePackageModal";
import { deletePlan } from "@/services/plans";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const columns: ColumnDef<Plan>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground uppercase">{row.original._id.slice(-6)}</span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat("en-BD", {
        minimumFractionDigits: 0,
      }).format(price);
      return (
        <div className="font-semibold text-primary">
          {price === 0 ? "Free" : `${formatted} ${currency}`}
        </div>
      );
    },
  },
  {
    header: "Duration",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 font-medium">
        <span>{row.original.durationValue}</span>
        <span className="text-muted-foreground text-xs uppercase">{row.original.durationUnit}</span>
      </div>
    ),
  },
  {
    accessorKey: "adsLimit",
    header: "Ads Limit",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-medium">
        {row.getValue("adsLimit")} Ads
      </Badge>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.original.features.length} features included
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("isActive") ? "default" : "destructive"}
      >
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <CellAction row={row} />,
  },
];

interface CellActionProps {
  row: Row<Plan>;
}

const CellAction = ({ row }: CellActionProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deletePlan(row.original._id);
    if (res?.success) {
      SuccessToast(res.message);
      setOpenDelete(false);
    } else {
      ErrorToast(res.message || "Failed to delete");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <UpdatePackageModal plan={row.original} />
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 />
        </Button>
      </div>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-semibold text-foreground">
                {row.original.name}
              </span>{" "}
              package and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? <><Loader2 className="animate-spin" />Deleting...</>: "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
