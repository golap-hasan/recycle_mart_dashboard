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
import { Ad } from "./columns";

const AdDetailsDialog = ({ ad }: { ad: Ad }) => {
  return (
    <Dialog>
      {/* Trigger button inside the table column */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="font-normal flex items-center gap-1">
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>

      {/* Glass‑morphism styled content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Ad Details</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            ID: {ad.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 text-sm mt-4">
          {/* Left column */}
          <div className="space-y-2">
            <div><span className="font-medium">Title:</span> {ad.title}</div>
            <div><span className="font-medium">Seller:</span> {ad.seller}</div>
            <div><span className="font-medium">Category:</span> {ad.category}</div>
            <div><span className="font-medium">Location:</span> {ad.location}</div>
            <div><span className="font-medium">Price:</span> ৳ {ad.price.toLocaleString("en-BD")}</div>
          </div>

          {/* Right column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Condition:</span>
              <Badge variant="outline" className="capitalize">{ad.condition}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge
                variant={
                  ad.status === "approved"
                    ? "default"
                    : ad.status === "pending"
                    ? "outline"
                    : ad.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
                className="capitalize"
              >
                {ad.status}
              </Badge>
            </div>
            <div><span className="font-medium">Posted:</span> {ad.postedDate}</div>
            <div><span className="font-medium">Views:</span> {ad.views}</div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdDetailsDialog
