"use client";

import { useAuth } from "@/hooks/use-auth";
import useOverview from "@/hooks/use-overview";
import { getCurrentMonthYear } from "@/utils/time-utils";
import CustomPieChart from "@/components/custom-pie-chart";

export default function OverviewPage() {
  const { userProfile } = useAuth();
  const {
    getCurrentMonthSummary,
    getMonthlyIncomeByCategory,
    getMonthlyExpenseByCategory,
  } = useOverview();

  const {
    data: currentMonthSummary,
    isLoading: currentMonthSummaryLoading,
    isError: currentMonthSummaryError,
  } = getCurrentMonthSummary(userProfile?.user_id as string);

  const {
    data: monthlyIncomeByCategory,
    isLoading: monthlyIncomeByCategoryLoading,
    isError: monthlyIncomeByCategoryError,
  } = getMonthlyIncomeByCategory(userProfile?.user_id as string);

  const {
    data: monthlyExpensebyCategory,
    isLoading: monthlyExpenseByCategoryyLoading,
    isError: monthlyExpenseByCategoryError,
  } = getMonthlyExpenseByCategory(userProfile?.user_id as string);

  const currentMonthSummaryData = [
    { name: "Income", value: currentMonthSummary?.income ?? 0, index: 0 },
    { name: "Expense", value: currentMonthSummary?.expense ?? 0, index: 1 },
  ].filter((category) => category.value != 0);

  const monthlyIncomeByCategoryData = [
    { name: "Salary", value: monthlyIncomeByCategory?.salary ?? 0 },
    { name: "Allowance", value: monthlyIncomeByCategory?.allowance ?? 0 },
    { name: "Side Income", value: monthlyIncomeByCategory?.side_income ?? 0 },
    { name: "Business", value: monthlyIncomeByCategory?.business ?? 0 },
    { name: "Others", value: monthlyIncomeByCategory?.income_others ?? 0 },
  ].filter((category) => category.value != 0);

  // prettier-ignore
  const monthlyExpenseByCategoryData = [
    { name: "Food", value: monthlyExpensebyCategory?.foods_and_drinks ?? 0 },
    { name: "Transport", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { name: "Groceries", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { name: "Bills", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { name: "Luxury", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { name: "Healthcare", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { name: "Others", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
  ];

  // TODO: Display the month somehow
  const { month } = getCurrentMonthYear("name");

  return (
    <div className="flex h-full flex-col space-y-4 px-4 py-2">
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4">
        <div className="flex w-full min-w-[360px] flex-col gap-2">
          <p className="text-primary text-lg font-medium">
            Income vs. Expenses
          </p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CustomPieChart data={currentMonthSummaryData} />
          </div>
        </div>
        <div className="flex w-full min-w-[360px] flex-col gap-2">
          <p className="text-primary text-lg font-medium">Income by Category</p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CustomPieChart data={monthlyIncomeByCategoryData} />
          </div>
        </div>
        <div className="flex w-full min-w-[360px] flex-col gap-2">
          <p className="text-primary text-lg font-medium">
            Expense by Category
          </p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CustomPieChart data={monthlyExpenseByCategoryData} />
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
