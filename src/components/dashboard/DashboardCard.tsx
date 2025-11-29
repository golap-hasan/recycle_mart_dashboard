import { cn } from "@/lib/utils";

interface DashboardCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change?: string; // e.g., "+12%" or "-5%"
}

export default function DashboardCard({ icon: Icon, title, value, change }: DashboardCardProps) {
  return (
    <div className={cn("bg-card text-card-foreground shadow-sm rounded-lg p-4 flex items-center space-x-3")}>
      <Icon className="w-6 h-6 text-primary" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      {change && (
        <span className={cn(
          "text-sm",
          change.startsWith("+") ? "text-green-500" : "text-red-500"
        )}>
          {change}
        </span>
      )}
    </div>
  );
}
