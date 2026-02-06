"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rejectAd } from "@/services/ads";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RejectAdModalProps {
  adId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function RejectAdModal({ adId, isOpen, onClose }: RejectAdModalProps) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const handleReject = async () => {
    if (!reason) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setLoading(true);
    const res = await rejectAd(adId, { reason, note });
    if (res.success) {
      toast.success("Ad rejected successfully");
      onClose();
    } else {
      toast.error(res.message || "Failed to reject ad");
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Advertisement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Rejection</Label>
            <Input
              id="reason"
              placeholder="e.g., Inappropriate content, Missing details"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Additional Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Provide more details for the seller..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              "Reject Ad"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
