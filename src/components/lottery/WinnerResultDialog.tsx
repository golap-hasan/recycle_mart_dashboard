/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Phone, Mail, Hash, PartyPopper } from "lucide-react";

interface WinnerResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  winnerData: any;
}

export function WinnerResultDialog({
  open,
  onOpenChange,
  winnerData,
}: WinnerResultDialogProps) {
  if (!winnerData) return null;

  const { winner, winningToken } = winnerData;
  const userData = winner?.user;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md border-none p-0 overflow-hidden bg-linear-to-b from-primary/10 to-background"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Winner Announcement</DialogTitle>
        <DialogDescription className="sr-only">Winner Announcement</DialogDescription>
        <div className="relative p-6 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-full shadow-lg">
            <Trophy className="h-8 w-8 text-primary-foreground" />
          </div>

          <div className="mt-8 space-y-2">
            <h2 className="text-3xl font-black tracking-tight flex items-center justify-center gap-2">
              <PartyPopper className="h-8 w-8 text-yellow-500" />
              WINNER FOUND!
              <PartyPopper className="h-8 w-8 text-yellow-500" />
            </h2>
            <p className="text-muted-foreground font-medium">
              Congratulations to the lucky winner!
            </p>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-card border shadow-xl space-y-6">
            {/* Winner Image & Name */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-24 w-24 rounded-full border-4 border-primary/20 overflow-hidden bg-muted">
                <img
                  src={userData?.image || "/placeholder.svg"}
                  alt={userData?.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{userData?.name}</h3>
                <Badge variant="secondary" className="mt-1">
                  Winner Candidate
                </Badge>
              </div>
            </div>

            {/* Winner Details */}
            <div className="grid gap-3 text-left">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Hash className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Winning Token
                  </p>
                  <p className="font-mono font-bold text-lg">{winningToken}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Phone Number
                  </p>
                  <p className="font-semibold">{userData?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Email Address
                  </p>
                  <p className="font-semibold truncate max-w-[200px]">
                    {userData?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-muted-foreground italic">
              The winner has been notified and the lottery status is now
              COMPLETED.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
