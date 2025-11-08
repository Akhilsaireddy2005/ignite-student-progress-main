import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
}

export const MetricCard = ({ title, value, icon: Icon, trend, subtitle }: MetricCardProps) => {
  const getTrendColor = () => {
    if (!trend) return "";
    return trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  };

  return (
    <Card className="gradient-card shadow-elegant hover:shadow-lg transition-smooth hover:scale-105 animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && <p className={`text-sm ${getTrendColor()}`}>{subtitle}</p>}
          </div>
          <Icon className="h-12 w-12 text-primary opacity-60" />
        </div>
      </CardContent>
    </Card>
  );
};
