"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Ad } from "@/types/ads.type";
import Image from "next/image";
import { format } from "date-fns";

const AdDetailsDialog = ({ ad }: { ad: Ad }) => {
  return (
    <Dialog>
      {/* Trigger button inside the table column */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-3">
          <Eye />
          View Details
        </Button>
      </DialogTrigger>

      {/* Glass‑morphism styled content */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Ad Details</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            ID: {ad._id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-4">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Title</span>
              <p className="text-base">{ad.title}</p>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Seller</span>
              <p className="text-base">{ad.user.name}</p>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Category</span>
              <Badge variant="outline" className="capitalize text-sm">
                {ad.categoryId?.name || "N/A"}
              </Badge>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Location</span>
              <p className="text-base">{ad.location}</p>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Price</span>
              <p className="text-base font-bold text-primary">৳ {ad.price.toLocaleString("en-BD")}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Condition</span>
              <Badge variant="outline" className="capitalize text-sm">{ad.condition}</Badge>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Status</span>
              <Badge
                variant={
                  ad.status === "ACTIVE"
                    ? "default"
                    : ad.status === "PENDING"
                    ? "outline"
                    : ad.status === "REJECTED"
                    ? "destructive"
                    : "secondary"
                }
                className="capitalize text-sm"
              >
                {ad.status}
              </Badge>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Created At</span>
              <p className="text-base">{format(new Date(ad.createdAt), "dd/MM/yyyy")}</p>
            </div>
            <div>
              <span className="font-semibold block text-muted-foreground mb-1">Views</span>
              <p className="text-base">{ad.views}</p>
            </div>
            {ad.status === "REJECTED" && ad.rejectReason && (
              <div className="col-span-2 bg-destructive/10 p-3 rounded-md border border-destructive/20">
                <span className="font-semibold block text-destructive mb-1">Reject Reason</span>
                <p className="text-sm">{ad.rejectReason}</p>
                {ad.rejectNote && (
                  <p className="text-xs text-muted-foreground mt-1 italic">Note: {ad.rejectNote}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold block text-muted-foreground mb-2">Description</span>
          <div className="bg-muted/30 p-4 rounded-md text-sm whitespace-pre-wrap leading-relaxed">
            {ad.description}
          </div>
        </div>

        {ad.images && ad.images.length > 0 && (
          <div className="mt-6">
            <span className="font-semibold block text-muted-foreground mb-2">Images</span>
            <div className="grid grid-cols-3 gap-2">
              {ad.images.map((img, idx) => (
                <div key={idx} className="relative w-full h-24 rounded-md border overflow-hidden">
                  <Image
                    src={img}
                    alt={`Ad ${idx}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 200px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdDetailsDialog
