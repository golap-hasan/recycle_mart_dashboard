"use client";

import CardsGrid from "@/components/dashboard/CardsGrid";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import LatestAdsTable from "@/components/dashboard/LatestAdsTable";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <CardsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserGrowthChart />
        <RevenueChart />
      </div>

      <LatestAdsTable />
    </div>
  );
}
