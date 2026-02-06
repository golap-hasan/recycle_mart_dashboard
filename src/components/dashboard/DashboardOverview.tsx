import CardsGrid from "@/components/dashboard/CardsGrid";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { getDashboardStats } from "@/services/dashboard";
import { DataTable } from "../ui/data-table";
import { adsColumns } from "../ads/columns";
import { getAllAds } from "@/services/ads";

export default async function DashboardOverview() {
  const [statsResult, adsResult] = await Promise.all([
    getDashboardStats(),
    getAllAds({ limit: "5" }),
  ]);

  const stats = statsResult?.data || {
    totalUsers: 0,
    totalVendors: 0,
    totalAds: 0,
    totalSales: 0,
  };

  const ads = adsResult?.data || [];
  // const meta = adsResult?.meta;

  return (
    <div className="space-y-6">
      <CardsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserGrowthChart />
        <RevenueChart />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Latest Ads</h2>
        <DataTable
          columns={adsColumns}
          data={ads.slice(0, 5)}
        />
      </div>
    </div>
  );
}
