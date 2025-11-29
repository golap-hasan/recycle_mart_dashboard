"use client";

import { Users, Package, AlertTriangle, Flag, DollarSign, Crown } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";

const stats = [
  { icon: Users, title: "Total Users", value: "12,450", change: "+12%" },
  { icon: Package, title: "Total Ads", value: "3,240", change: "+8%" },
  { icon: AlertTriangle, title: "Pending Ads", value: "1,140", change: "-5%" },
  { icon: Flag, title: "Reported Ads", value: 87, change: "+3%" },
  { icon: DollarSign, title: "Total Revenue", value: "$45,230", change: "+16%" },
  { icon: Crown, title: "Premium Users", value: 2340, change: "+22%" },
];

export default function CardsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((s, i) => (
        <DashboardCard key={i} icon={s.icon} title={s.title} value={s.value} change={s.change} />)
      )}
    </div>
  );
}
