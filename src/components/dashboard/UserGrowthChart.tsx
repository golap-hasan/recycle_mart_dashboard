"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { date: "2025-10-01", users: 120 },
  { date: "2025-10-08", users: 135 },
  { date: "2025-10-15", users: 150 },
  { date: "2025-10-22", users: 165 },
  { date: "2025-10-29", users: 180 },
  { date: "2025-11-05", users: 200 },
  { date: "2025-11-12", users: 220 },
  { date: "2025-11-19", users: 240 },
  { date: "2025-11-26", users: 260 },
];

const chartConfig: ChartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--primary))",
  },
};

export default function UserGrowthChart() {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-2">User Growth (Last 30 Days)</h2>
      <ChartContainer config={chartConfig} className="h-60 w-full">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="var(--color-users)"
            strokeWidth={2}
            dot={false}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
