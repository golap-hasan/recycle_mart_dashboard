/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Trophy, Loader2, Edit, Ticket } from "lucide-react";
import { runLotteryDraw } from "@/services/lottery";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Lottery } from "@/types/lottery.type";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UpdateLotteryForm } from "./UpdateLotteryForm";
import { LotteryDetailsDialog } from "./LotteryDetailsDialog";
import { WinnerResultDialog } from "./WinnerResultDialog";

interface LotteryActionsProps {
  lottery: Lottery;
}

export function LotteryActions({ lottery }: LotteryActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [winnerResult, setWinnerResult] = useState<any>(null);
  const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState(false);
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const [winningTokenInput, setWinningTokenInput] = useState("");

  const handleRunDraw = async () => {
    setIsLoading(true);
    // Get token from localStorage if exists
    const savedToken = localStorage.getItem(`winning_token_${lottery._id}`);
    const res = await runLotteryDraw(lottery._id, savedToken || undefined);
    if (res.success) {
      SuccessToast("Winner picked successfully!");
      setWinnerResult(res.data);
      setIsWinnerDialogOpen(true);
      // Clear token after draw
      if (savedToken) {
        localStorage.removeItem(`winning_token_${lottery._id}`);
      }
    } else {
      ErrorToast(res.message || "Failed to run draw");
    }
    setIsLoading(false);
  };

  const handleSaveToken = () => {
    if (winningTokenInput.trim()) {
      localStorage.setItem(`winning_token_${lottery._id}`, winningTokenInput.trim());
      SuccessToast("Winning token saved to local storage!");
      setIsTokenDialogOpen(false);
    } else {
      localStorage.removeItem(`winning_token_${lottery._id}`);
      SuccessToast("Winning token cleared!");
      setIsTokenDialogOpen(false);
    }
  };

  const openTokenDialog = () => {
    const savedToken = localStorage.getItem(`winning_token_${lottery._id}`);
    setWinningTokenInput(savedToken || "");
    setIsTokenDialogOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {lottery.status === "ACTIVE" && (
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 border-primary text-primary hover:bg-primary hover:text-white"
          onClick={() => setIsAlertOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trophy className="h-4 w-4 mr-2" />}
          Pick Winner
        </Button>
      )}

      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isLoading}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            
            <SheetTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Lottery
              </DropdownMenuItem>
            </SheetTrigger>

            {lottery.status === "ACTIVE" && (
              <DropdownMenuItem onClick={openTokenDialog}>
                <Ticket className="mr-2 h-4 w-4" />
                Set Winner Token
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <SheetContent className="overflow-y-auto min-w-[400px] sm:min-w-[540px]">
          <SheetHeader>
            <SheetTitle>Update Lottery</SheetTitle>
            <SheetDescription>
              Modify the details of your lottery campaign.
            </SheetDescription>
          </SheetHeader>
          <UpdateLotteryForm 
            lottery={lottery} 
            onSuccess={() => setIsEditOpen(false)} 
          />
        </SheetContent>
      </Sheet>
      <LotteryDetailsDialog 
        lottery={lottery} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will randomly select a winner from the participants of this lottery. This process cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRunDraw}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirm Draw
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <WinnerResultDialog 
        open={isWinnerDialogOpen}
        onOpenChange={setIsWinnerDialogOpen}
        winnerData={winnerResult}
      />

      <Dialog open={isTokenDialogOpen} onOpenChange={setIsTokenDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Winning Token</DialogTitle>
            <DialogDescription>
              Enter the token number that should win this lottery. This will be stored locally and used for the next draw.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token" className="text-right">
                Token
              </Label>
              <Input
                id="token"
                value={winningTokenInput}
                onChange={(e) => setWinningTokenInput(e.target.value)}
                placeholder="e.g. TKN-123456"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTokenDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveToken}>Save Token</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
