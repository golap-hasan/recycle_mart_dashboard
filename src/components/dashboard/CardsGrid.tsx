"use client";

import { Users, Package, Banknote, Store } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface CardsGridProps {
  stats: {
    totalUsers: number;
    totalVendors: number;
    totalAds: number;
    totalSales: number;
  };
}

export default function CardsGrid({ stats }: CardsGridProps) {
  const statItems = [
    { icon: Users, title: "Total Users", value: stats.totalUsers.toLocaleString() },
    { icon: Store, title: "Total Vendors", value: stats.totalVendors.toLocaleString() },
    { icon: Package, title: "Total Ads", value: stats.totalAds.toLocaleString() },
    { icon: Banknote, title: "Total Sales", value: `৳ ${stats.totalSales.toLocaleString("en-BD")}` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((s, i) => (
        <DashboardCard key={i} icon={s.icon} title={s.title} value={s.value} />
      ))}
    </div>
  );
}
