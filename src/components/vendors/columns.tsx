
"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, Check, X, Ban, LockOpen, Loader2 } from "lucide-react";
import { formatDate, SuccessToast, ErrorToast } from "@/lib/utils";
import { Vendor } from "@/types/vendors.type";
import { approveVendor, rejectVendor, blockVendor, unblockVendor } from "@/services/vendors";

const VendorActions = ({ vendor }: { vendor: Vendor }) => {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | "block" | "unblock" | null>(null);
  const [reason, setReason] = useState("");

  const isOpen = (currentAction: typeof action) => action === currentAction;
  
  const resetState = () => {
    setAction(null);
    setReason("");
    setLoading(false);
  };

  const handleAction = async () => {
    setLoading(true);
    try {
      let res;
      if (action === "approve") {
        res = await approveVendor(vendor._id);
      } else if (action === "unblock") {
        res = await unblockVendor(vendor._id, reason);
      } else if (action === "reject") {
        if (!reason.trim()) {
           ErrorToast("Reason is required");
           setLoading(false);
           return;
        }
        res = await rejectVendor(vendor._id, reason);
      } else if (action === "block") {
         if (!reason.trim()) {
           ErrorToast("Reason is required");
           setLoading(false);
           return;
        }
        res = await blockVendor(vendor._id, reason);
      }

      if (res?.success) {
        SuccessToast(`Vendor ${action}ed successfully`);
        resetState();
      } else {
        ErrorToast(res?.message || "Something went wrong");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {vendor.status === "PENDING" && (
            <>
              <DropdownMenuItem onClick={() => setAction("approve")}>
                <Check className="text-green-500" /> Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAction("reject")}>
                <X className="text-destructive" /> Reject
              </DropdownMenuItem>
            </>
          )}
          {vendor.status === "APPROVED" && !vendor.blocked && (
            <DropdownMenuItem onClick={() => setAction("block")}>
              <Ban className="text-destructive" /> Block
            </DropdownMenuItem>
          )}
          {vendor.blocked && (
            <DropdownMenuItem onClick={() => setAction("unblock")}>
              <LockOpen className="text-blue-500" /> Unblock
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Approve Confirmation */}
      <AlertDialog open={isOpen("approve")} onOpenChange={(open) => !open && resetState()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This will allow the vendor to list products and operate on the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); handleAction(); }} disabled={loading} className="bg-green-600 hover:bg-green-700">
               {loading && <Loader2 className="animate-spin" />} Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unblock Confirmation */}
      <AlertDialog open={isOpen("unblock")} onOpenChange={(open) => !open && resetState()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unblock Vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore the vendor&apos;s access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); handleAction(); }} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading && <Loader2 className="animate-spin" />} Unblock
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog for Reject/Block with Reason */}
      <Dialog open={isOpen("reject") || isOpen("block")} onOpenChange={(open) => !open && resetState()}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="capitalize">{action} Vendor</DialogTitle>
               <DialogDescription>
                  Please provide a reason for {action}ing this vendor.
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid gap-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea 
                     id="reason" 
                     placeholder={`Why are you ${action}ing this vendor?`} 
                     value={reason} 
                     onChange={(e) => setReason(e.target.value)}
                  />
               </div>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={resetState} disabled={loading}>Cancel</Button>
               <Button onClick={handleAction} disabled={loading} variant="destructive">
                  {loading && <Loader2 className="animate-spin" />} Confirm {action && action.charAt(0).toUpperCase() + action.slice(1)}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </>
  );
};

export const vendorsColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "storeName",
    header: "Store",
    cell: ({ row }) => {
      const vendor = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={vendor.storeImage} alt={vendor.storeName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {vendor.storeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{vendor.storeName}</span>
            <span className="text-xs text-muted-foreground md:hidden">{vendor.storeLocation}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.name",
    header: "Owner",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isBlocked = row.original.blocked;
      
      if (isBlocked) {
          return <Badge variant="destructive">BLOCKED</Badge>;
      }

      return (
        <Badge
          variant={
            status === "APPROVED"
              ? "default"
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
    accessorKey: "listingsUsed",
    header: "Listings",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("listingsUsed")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.getValue("createdAt"))}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <div className="text-right"><VendorActions vendor={row.original} /></div>,
  },
];
