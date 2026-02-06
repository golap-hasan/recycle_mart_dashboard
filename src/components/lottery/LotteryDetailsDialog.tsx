/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lottery } from "@/types/lottery.type";
import { Badge } from "@/components/ui/badge";
import { Calendar, Banknote, User, Award, Info, Hash, Trophy } from "lucide-react";
import { format } from "date-fns";

interface LotteryDetailsDialogProps {
  lottery: Lottery;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LotteryDetailsDialog({ lottery, open, onOpenChange }: LotteryDetailsDialogProps) {
  const statusColors = {
    ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
    INACTIVE: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-2xl font-bold">{lottery.title}</DialogTitle>
            <Badge className={statusColors[lottery.status]}>
              {lottery.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Image Section */}
          {lottery.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
              <img
                src={lottery.image}
                alt={lottery.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Banknote className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Ticket Price</p>
                <p className="font-bold">{lottery.ticketPrice} BDT</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Draw Date</p>
                <p className="font-bold">{format(new Date(lottery.drawDate), "PPP")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Participants</p>
                <p className="font-bold">{lottery.participantsCount}</p>
              </div>
            </div>
          </div>

          {/* Prize Section */}
          <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Award className="h-5 w-5" />
              <h3 className="font-bold uppercase text-sm tracking-wider">Prize Details</h3>
            </div>
            <p className="text-lg font-semibold">{lottery.prize || "No prize specified"}</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="h-4 w-4" />
              <h3 className="font-semibold text-sm">Description</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {lottery.description || "No description available for this lottery."}
            </p>
          </div>

          {/* Winner Section (If completed) */}
          {lottery.status === "COMPLETED" && lottery.winnerToken && (
            <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-2 mb-2 text-yellow-600">
                <Trophy className="h-5 w-5" />
                <h3 className="font-bold uppercase text-sm tracking-wider">Winner Information</h3>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <p className="font-mono text-sm bg-background px-2 py-1 rounded border">
                  {lottery.winnerToken}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
