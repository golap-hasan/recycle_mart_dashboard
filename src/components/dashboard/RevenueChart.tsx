"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { month: "Jun", packages: 2400, topup: 1240, membership: 800 },
  { month: "Jul", packages: 2210, topup: 1290, membership: 900 },
  { month: "Aug", packages: 2290, topup: 1350, membership: 1100 },
  { month: "Sep", packages: 2000, topup: 1480, membership: 1200 },
  { month: "Oct", packages: 2181, topup: 1620, membership: 1400 },
  { month: "Nov", packages: 2500, topup: 1780, membership: 1600 },
];

export default function RevenueChart() {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-2">Revenue Analytics</h2>
      <ChartContainer
        className="h-60 w-full"
        config={chartConfig}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="packages" fill="var(--color-packages)" radius={[6,6,0,0]} />
          <Bar dataKey="topup" fill="var(--color-topup)" radius={[6,6,0,0]} />
          <Bar dataKey="membership" fill="var(--color-membership)" radius={[6,6,0,0]} />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

const chartConfig: ChartConfig = {
  packages: {
    label: "Packages",
    color: "#3b82f6",
  },
  topup: {
    label: "Top-up",
    color: "#f59e0b",
  },
  membership: {
    label: "Membership",
    color: "#10b981",
  },
};
