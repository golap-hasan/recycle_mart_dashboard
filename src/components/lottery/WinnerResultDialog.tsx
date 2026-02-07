/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trophy, Phone, Mail, Hash, PartyPopper, Star, Sparkles, X } from "lucide-react";

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
  const [countdown, setCountdown] = useState(10);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    if (open && !showWinner) {
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowWinner(true);
            triggerConfetti();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [open, showWinner]);

  useEffect(() => {
    if (!open) {
      setShowWinner(false);
      setCountdown(10);
    }
  }, [open]);

  const triggerConfetti = () => {
    // Dynamic import to avoid SSR issues and use only when needed
    import("canvas-confetti").then((confetti) => {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti.default({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti.default({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }).catch(err => console.error("Confetti failed to load", err));
  };

  if (!winnerData) return null;

  const { winner, winningToken } = winnerData;
  const userData = winner?.user;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`max-w-2xl border-none p-0 overflow-hidden transition-all duration-700 ${
          showWinner ? "bg-linear-to-br from-yellow-400/20 via-background to-primary/20" : "bg-background"
        }`}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Winner Announcement</DialogTitle>
        <DialogDescription className="sr-only">Winner Announcement</DialogDescription>
        
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="relative min-h-[500px] flex flex-col items-center justify-center p-8">
          {!showWinner ? (
            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 scale-150" />
                <div className="relative bg-primary text-primary-foreground w-32 h-32 rounded-full flex items-center justify-center text-6xl font-black shadow-2xl border-4 border-background">
                  {countdown}
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter animate-pulse uppercase">
                  Picking a Winner...
                </h2>
                <p className="text-muted-foreground font-medium text-lg italic">
                  Get ready for the big reveal!
                </p>
              </div>
              <div className="flex gap-4 justify-center opacity-50">
                <Sparkles className="h-8 w-8 text-yellow-500 animate-bounce" />
                <Star className="h-8 w-8 text-yellow-500 animate-bounce delay-100" />
                <Sparkles className="h-8 w-8 text-yellow-500 animate-bounce delay-200" />
              </div>
            </div>
          ) : (
            <div className="w-full animate-in zoom-in slide-in-from-bottom-10 duration-1000">
              <div className="text-center space-y-4 mb-8">
                <div className="inline-flex items-center justify-center gap-3 bg-yellow-400 text-black px-8 py-3 rounded-full font-black text-2xl shadow-xl animate-bounce border-4 border-white">
                  <Trophy className="h-8 w-8" />
                  WINNER FOUND!
                  <Trophy className="h-8 w-8" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-yellow-600 to-primary uppercase italic">
                  Congratulations!
                </h1>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center bg-card/50 backdrop-blur-md p-8 rounded-[40px] border-4 border-yellow-400/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all" />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 animate-pulse rounded-full blur-xl opacity-50" />
                    <div className="relative h-48 w-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-muted">
                      <img
                        src={userData?.image || "/placeholder.svg"}
                        alt={userData?.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white">
                      LOTTERY WINNER
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-black tracking-tight">{userData?.name}</h3>
                    <p className="text-primary font-bold flex items-center justify-center gap-2 mt-1">
                      <Mail className="h-4 w-4" />
                      {userData?.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/80 dark:bg-black/40 p-6 rounded-3xl shadow-inner border border-yellow-400/20">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-2">
                          <Hash className="h-3 w-3" /> Winning Token
                        </Label>
                        <div className="text-4xl font-mono font-black text-primary bg-primary/5 p-3 rounded-xl border-2 border-dashed border-primary/30 text-center animate-pulse">
                          {winningToken}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/20">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Contact Number</p>
                            <p className="font-bold text-lg">{userData?.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/20">
                          <div className="h-10 w-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                            <PartyPopper className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Status</p>
                            <Badge className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1">CLAIM READY</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center animate-bounce delay-1000">
                <p className="text-sm font-bold text-muted-foreground flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Winner has been officially declared!
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
