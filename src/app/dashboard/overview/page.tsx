"use client";

import { useAuth } from "@/hooks/use-auth";
import { transactionColumns } from "./column";
import useOverview from "@/hooks/use-overview";
import { getCurrentMonthYear } from "@/utils/time-utils";
import CustomPieChart from "@/components/custom-pie-chart";
import { DataTable } from "@/app/dashboard/transactions/data-table";
import { allCategoriesRecord } from "@/constants/constants";

export default function OverviewPage() {
  const { userProfile } = useAuth();
  const {
    getCurrentMonthSummary,
    getMonthlyIncomeByCategory,
    getMonthlyExpenseByCategory,
    getDailyTransactions,
    getDailyInsights,
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

  const {
    data: dailyTransactions,
    isLoading: dailyTransactionsLoading,
    isError: dailyTransactionsError,
  } = getDailyTransactions(userProfile?.user_id as string);

  const {
    data: dailyInsights,
    isLoading: dailyInsightsLoading,
  } = getDailyInsights(userProfile?.user_id as string);

  // Derived insight values
  const spendingVsAverage = dailyInsights
    ? dailyInsights.dailyAverageExpense > 0
      ? ((dailyInsights.todayExpenseTotal - dailyInsights.dailyAverageExpense) / dailyInsights.dailyAverageExpense) * 100
      : null
    : null;

  const netCashFlow = dailyInsights
    ? dailyInsights.todayIncomeTotal - dailyInsights.todayExpenseTotal
    : null;

  const dominantCategory = dailyInsights
    ? dailyInsights.categoryBreakdown.length > 0 && dailyInsights.todayExpenseTotal > 0
      ? (() => {
          const sorted = [...dailyInsights.categoryBreakdown].sort((a, b) => b.amount - a.amount);
          const top = sorted[0];
          const percentage = (top.amount / dailyInsights.todayExpenseTotal) * 100;
          return percentage >= 50 ? { ...top, percentage } : null;
        })()
      : null
    : null;

  // prettier-ignore
  const currentMonthSummaryData = [
    { key:"income", name: "Income", value: currentMonthSummary?.income ?? 0, index: 0 },
    { key: "expense", name: "Expense", value: currentMonthSummary?.expense ?? 0, index: 1 },
  ].filter((category) => category.value != 0);

  // prettier-ignore
  const monthlyIncomeByCategoryData = [
    { key:"salary",name: "Salary", value: monthlyIncomeByCategory?.salary ?? 0 },
    { key:"allowance",name: "Allowance", value: monthlyIncomeByCategory?.allowance ?? 0 },
    { key:"side_income",name: "Side Income", value: monthlyIncomeByCategory?.side_income ?? 0 },
    { key:"business", name: "Business", value: monthlyIncomeByCategory?.business ?? 0 },
    { key:"income_others",name: "Others", value: monthlyIncomeByCategory?.income_others ?? 0 },
  ].filter((category) => category.value != 0);

  // prettier-ignore
  const monthlyExpenseByCategoryData = [
    { key:"food", name: "Food", value: monthlyExpensebyCategory?.foods_and_drinks ?? 0 },
    { key:"transport", name: "Transport", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { key:"groceries", name: "Groceries", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { key:"bills", name: "Bills", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { key:"luxury", name: "Luxury", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { key:"healthcare", name: "Healthcare", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
    { key:"expense_others", name: "Others", value:  monthlyExpensebyCategory?.foods_and_drinks ?? 0},
  ];

  // TODO: Display the month somehow
  const { month } = getCurrentMonthYear("name");

  return (
    <div className="flex h-full flex-col gap-6 space-y-4 px-4 py-2">
      {/* Charts */}
      <div className="no-scrollbar -mx-4 flex flex-nowrap gap-4 overflow-x-auto px-4">
        <div className="flex w-full max-w-[90%] shrink-0 flex-col gap-2 sm:max-w-[480px]">
          <p className="text-primary text-lg font-medium">Today's Insights</p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border py-1">
            {dailyInsightsLoading ? (
              <p className="text-muted-foreground p-4 text-xs">Loading...</p>
            ) : !dailyInsights ? (
              <p className="text-muted-foreground p-4 text-xs">No data available</p>
            ) : (
              <div className="divide-border flex flex-1 flex-col divide-y">
                {spendingVsAverage !== null && (
                  <div className="flex flex-1 flex-col justify-center px-4">
                    <p className="text-xs font-medium">
                      {spendingVsAverage > 0
                        ? `${spendingVsAverage.toFixed(0)}% above average`
                        : spendingVsAverage < 0
                          ? `${Math.abs(spendingVsAverage).toFixed(0)}% below average`
                          : "On average"}
                    </p>
                    <p className="text-muted-foreground text-[11px]">Daily spending</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-center px-4">
                  <p className="text-xs font-medium">
                    {dailyInsights.todayIncomeTotal > 0
                      ? dailyInsights.todayIncomeTotal.toLocaleString()
                      : "No income today"}
                  </p>
                  <p className="text-muted-foreground text-[11px]">Income earned</p>
                </div>
                {dominantCategory && (
                  <div className="flex flex-1 flex-col justify-center px-4">
                    <p className="text-xs font-medium">
                      {allCategoriesRecord[dominantCategory.category]?.label ?? dominantCategory.category}
                      <span className="text-muted-foreground ml-1 text-[11px]">
                        {dominantCategory.percentage.toFixed(0)}%
                      </span>
                    </p>
                    <p className="text-muted-foreground text-[11px]">Top category</p>
                  </div>
                )}
                {dailyInsights.largestTransaction && (
                  <div className="flex flex-1 flex-col justify-center px-4">
                    <p className="text-xs font-medium">
                      {dailyInsights.largestTransaction.amount?.toLocaleString()}
                      <span className="text-muted-foreground ml-1 text-[11px]">
                        {allCategoriesRecord[dailyInsights.largestTransaction.category ?? ""]?.label ?? dailyInsights.largestTransaction.category}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-[11px]">Largest transaction</p>
                  </div>
                )}
                {netCashFlow !== null && (
                  <div className="flex flex-1 flex-col justify-center px-4">
                    <p className={`text-xs font-medium ${netCashFlow >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {netCashFlow >= 0 ? "+" : ""}{netCashFlow.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-[11px]">Net cash flow</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full max-w-[90%] shrink-0 flex-col gap-2 sm:max-w-[480px]">
          <p className="text-primary text-lg font-medium">
            Income vs. Expenses for {month}
          </p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CustomPieChart data={currentMonthSummaryData} />
          </div>
        </div>
        <div className="flex w-full max-w-[90%] shrink-0 flex-col gap-2 sm:max-w-[480px]">
          <p className="text-primary text-lg font-medium">
            Income by Category for {month}
          </p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CustomPieChart data={monthlyIncomeByCategoryData} />
          </div>
        </div>
        <div className="flex w-full max-w-[90%] shrink-0 flex-col gap-2 sm:max-w-[480px]">
          <p className="text-primary text-lg font-medium">
            Expense by Category for {month}
          </p>
          <div className="bg-card border-border flex h-72 w-full flex-col rounded-2xl border p-4">
            <CustomPieChart data={monthlyExpenseByCategoryData} />
          </div>
        </div>
      </div>
      {/* */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col sm:flex-1">
          <p className="text-primary text-lg font-medium">
            Today's Transactions
          </p>
          <DataTable
            data={dailyTransactions?.data || []}
            columns={transactionColumns}
            isError={false}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}

/**
 *
 * Most Recent Transactions for February -> Today's transactions
 *
 */

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
  Total balance overview (income minus expenses) ✅
  This month’s summary: total income vs. total expenses ✅
  Recent transactions (last 5–10 entries) ✅
  Top spending categories in a mini chart or card
  Quick insight cards: highest expense today, largest income entry, etc.
  Quick add transaction button for income or expense
  Mini budget progress bars (monthly goal vs. actual)
  Alerts for overspending or bills due soon
  Simple filter for recent transactions (category or type)
  Option to view balance and summary in preferred currency
 */
