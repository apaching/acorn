import { Construction } from "lucide-react";

/**
 * Save this styling
 */

export default function AnalyticsPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="bg-card relative w-full max-w-md overflow-hidden rounded-2xl border shadow-lg">
        {/* subtle gradient glow */}
        <div className="from-primary/10 to-secondary/10 pointer-events-none absolute inset-0 bg-gradient-to-tr via-transparent" />

        <div className="relative flex flex-col items-center gap-4 p-8 text-center">
          <div className="bg-primary/10 flex h-28 w-28 items-center justify-center rounded-full">
            <Construction className="text-primary" size={72} />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold">Analytics coming soon</p>
            <p className="text-muted-foreground text-sm">
              We’re polishing the dashboards and wiring up the data. This page
              will be worth the wait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
  Analytics (Deep Dive)
  Monthly trend over the last year (line chart)
  Category breakdown over time (stacked bar)
  Filter by custom date ranges
  Compare spending between categories
  Predictive insights: “Your expenses are trending +10% vs last year”
  Export charts or data for reports 

  Suggested Features / Bullet Points for Analytics:
  Custom date range selection (day, week, month, year)
  Trendline graphs for income and expenses over time
  Category breakdowns: pie charts, stacked bar charts
  Compare categories over different periods
  Identify highest and lowest spending categories
  Monthly or yearly summary tables with totals and averages
  Predictive insights (e.g., projected savings or expenses)
  Filter transactions by type, category, or tag
  Export charts or raw data (CSV, PDF)
  Visualize recurring transactions or subscriptions trends
  Alerts and insights based on patterns (e.g., “Food expenses increased 10% vs last month”) 
 */
