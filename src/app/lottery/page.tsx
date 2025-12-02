

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Lottery, lotteryColumns } from "@/components/lottery/lottery-columns";
import PageHeader from "@/components/ui/page-header";
import { CreateLotteryForm } from "@/components/lottery/CreateLotteryForm";
// Mock data
const mockLotteries: Lottery[] = [
  {
    id: "1",
    title: "Weekly Mega Jackpot",
    drawDate: "2025-12-10",
    participants: 1250,
    status: "active",
    prize: "iPhone 15 Pro Max",
  },
  {
    id: "2",
    title: "New Year Special",
    drawDate: "2026-01-01",
    participants: 5000,
    status: "active",
    prize: "Tesla Model 3",
  },
  {
    id: "3",
    title: "November Giveaway",
    drawDate: "2025-11-30",
    participants: 850,
    status: "completed",
    prize: "MacBook Pro M3",
  },
  {
    id: "4",
    title: "Flash Lottery",
    drawDate: "2025-12-05",
    participants: 300,
    status: "inactive",
    prize: "$500 Gift Card",
  },
  {
    id: "5",
    title: "Community Raffle",
    drawDate: "2025-12-15",
    participants: 150,
    status: "active",
    prize: "PlayStation 5",
  },
];

const meta = {
  total: 5,
  page: 1,
  limit: 5,
  totalPages: 5,
};

export default function LotteryManagement() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
       <PageHeader title="Lottery Management" description="Create and manage your lottery campaigns."/>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus /> Create Lottery
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Lottery</SheetTitle>
              <SheetDescription>
                Fill in the details below to create a new lottery campaign.
              </SheetDescription>
            </SheetHeader>
            <CreateLotteryForm />
          </SheetContent>
        </Sheet>
      </div>

      <DataTable
        columns={lotteryColumns}
        data={mockLotteries}
        meta={meta}
      />
    </div>
  );
}
