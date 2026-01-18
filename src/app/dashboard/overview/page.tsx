"use client";

import { useAuth } from "@/hooks/use-auth";
import useOverview from "@/hooks/use-overview";
import CurrentMonthPieChart from "@/components/current-month-pie";
import { getCurrentMonthYear } from "@/utils/time-utils";

export default function OverviewPage() {
  const { userProfile } = useAuth();
  const { getCurrentMonthSummary } = useOverview();

  const {
    data: currentMonthSummary,
    isLoading: currentMonthIncomeLoading,
    isError: currentMonthIncomeError,
  } = getCurrentMonthSummary(userProfile?.user_id as string);

  const data = [
    { name: "Income", value: currentMonthSummary?.income ?? 0, index: 0 },
    { name: "Expense", value: currentMonthSummary?.expense ?? 0, index: 1 },
  ];

  const { month } = getCurrentMonthYear("name");

  return (
    <div className="flex h-full flex-col space-y-4 px-4 py-2">
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4">
        <div className="flex w-full min-w-[360px] flex-col gap-2">
          <p className="text-primary text-lg font-medium">
            Income vs. Expenses for <span className="">{month}</span>
          </p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CurrentMonthPieChart data={data} />
          </div>
        </div>

        <div className="flex w-full min-w-[360px] flex-col gap-2">
          <p className="text-primary text-lg font-medium">Income vs Expense</p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CurrentMonthPieChart data={data} />
          </div>
        </div>

        <div className="flex w-full min-w-[360px] flex-col gap-2">
          <p className="text-primary text-lg font-medium">Income vs Expense</p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CurrentMonthPieChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Income vs Expense, Expenses by category, Income by category
// Highest income, highest expense

/**
 *  - Pie chart -> expense total vs income total
 *  - Last x amount of transactions
 *  - Top 5 spending transactions OR pie chart of all expense by category
 *  - Top 5 income transactions OR pie chart of all income by category
 *  - Insights:
 *    - "Spent 20% less than last month, etc."
 *
 */

/**
  Suggested Features / Bullet Points for Home:
  Total balance overview (income minus expenses)
  This month’s summary: total income vs. total expenses
  Recent transactions (last 5–10 entries)
  Top spending categories in a mini chart or card
  Quick insight cards: highest expense today, largest income entry, etc.
  Quick add transaction button for income or expense
  Mini budget progress bars (monthly goal vs. actual)
  Alerts for overspending or bills due soon
  Simple filter for recent transactions (category or type)
  Option to view balance and summary in preferred currency
 */
