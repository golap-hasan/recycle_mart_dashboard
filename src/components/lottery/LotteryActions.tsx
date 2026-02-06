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
import { MoreVertical, Eye, Trophy, Loader2, Edit } from "lucide-react";
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

  const handleRunDraw = async () => {
    setIsLoading(true);
    const res = await runLotteryDraw(lottery._id);
    if (res.success) {
      SuccessToast("Winner picked successfully!");
      setWinnerResult(res.data);
      setIsWinnerDialogOpen(true);
    } else {
      ErrorToast(res.message || "Failed to run draw");
    }
    setIsLoading(false);
  };

  return (
    <div className="text-right">
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
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
              <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                <Trophy className="mr-2 h-4 w-4" />
                Pick Winner
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
    </div>
  );
}
