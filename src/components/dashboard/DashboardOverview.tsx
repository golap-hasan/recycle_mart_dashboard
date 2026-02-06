import CardsGrid from "@/components/dashboard/CardsGrid";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import LatestAdsTable from "@/components/dashboard/LatestAdsTable";
import { getDashboardStats } from "@/services/dashboard";

export default async function DashboardOverview() {
  const result = await getDashboardStats();
  const stats = result?.data || {
    totalUsers: 0,
    totalVendors: 0,
    totalAds: 0,
    totalSales: 0,
  };

  return (
    <div className="space-y-6">
      <CardsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserGrowthChart />
        <RevenueChart />
      </div>

      <LatestAdsTable />
    </div>
  );
}
