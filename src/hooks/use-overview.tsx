/**
 *  Functions for fetching data from the 'Quick Overview' page
 */

import { useCallback } from "react";
import { supabase } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentMonthYear } from "@/utils/time-utils";
import { Transaction } from "@/types/types";

export default function useOverview() {
  const queryClient = useQueryClient();

  const assertClient = useCallback(() => {
    if (!supabase) {
      throw new Error(
        "Supabase not configured: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY",
      );
    }

    return supabase;
  }, []);

  const getCurrentMonthSummary = (userId: string) => {
    const { month, year } = getCurrentMonthYear();

    return useQuery({
      queryKey: ["currentMonthSummary", month, year],
      enabled: !!userId,
      queryFn: async () => {
        const supabaseClient = assertClient();

        const startOfMonth = new Date(Date.UTC(year, (month as number) - 1, 1));
        const startOfNextMonth = new Date(Date.UTC(year, month as number, 1));

        const fetchByType = async (type: "income" | "expense") => {
          const { data, error } = await supabaseClient
            .from("transactions")
            .select("amount")
            .eq("user_id", userId)
            .eq("type", type)
            .gte("transaction_date", startOfMonth.toISOString())
            .lt("transaction_date", startOfNextMonth.toISOString());

          if (error) throw error;

          return data?.reduce((sum, row) => sum + row.amount, 0) ?? 0;
        };

        const [income, expense] = await Promise.all([
          fetchByType("income"),
          fetchByType("expense"),
        ]);

        return {
          income,
          expense,
          balance: income - expense,
        };
      },
    });
  };

  const getMonthlyIncomeByCategory = (userId: string) => {
    const { month, year } = getCurrentMonthYear();

    return useQuery({
      queryKey: ["monthlyIncomeByCategory", month, year],
      enabled: !!userId,
      queryFn: async () => {
        const supabaseClient = assertClient();

        const startOfMonth = new Date(Date.UTC(year, (month as number) - 1, 1));
        const startOfNextMonth = new Date(Date.UTC(year, month as number, 1));

        const fetchByCategory = async (
          category:
            | "salary"
            | "allowance"
            | "side_income"
            | "business"
            | "income_others",
        ) => {
          const { data, error } = await supabaseClient
            .from("transactions")
            .select("amount")
            .eq("user_id", userId)
            .eq("category", category)
            .gte("transaction_date", startOfMonth.toISOString())
            .lt("transaction_date", startOfNextMonth.toISOString());

          if (error) throw error;

          return data?.reduce((sum, row) => sum + row.amount, 0) ?? 0;
        };

        const [salary, allowance, side_income, business, income_others] =
          await Promise.all([
            fetchByCategory("salary"),
            fetchByCategory("allowance"),
            fetchByCategory("side_income"),
            fetchByCategory("business"),
            fetchByCategory("income_others"),
          ]);

        return {
          salary,
          allowance,
          side_income,
          business,
          income_others,
        };
      },
    });
  };

  const getMonthlyExpenseByCategory = (userId: string) => {
    const { month, year } = getCurrentMonthYear();

    return useQuery({
      queryKey: ["monthlyExpenseCategory", month, year],
      enabled: !!userId,
      queryFn: async () => {
        const supabaseClient = assertClient();

        const startOfMonth = new Date(Date.UTC(year, (month as number) - 1, 1));
        const startOfNextMonth = new Date(Date.UTC(year, month as number, 1));

        const fetchByCategory = async (
          category:
            | "foods_and_drinks"
            | "transport"
            | "groceries"
            | "bills"
            | "luxury"
            | "healthcare"
            | "expense_others",
        ) => {
          const { data, error } = await supabaseClient
            .from("transactions")
            .select("amount")
            .eq("user_id", userId)
            .eq("category", category)
            .gte("transaction_date", startOfMonth.toISOString())
            .lt("transaction_date", startOfNextMonth.toISOString());

          if (error) throw error;

          return data?.reduce((sum, row) => sum + row.amount, 0) ?? 0;
        };

        const [
          foods_and_drinks,
          transport,
          groceries,
          bills,
          luxury,
          healthcare,
          expense_others,
        ] = await Promise.all([
          fetchByCategory("foods_and_drinks"),
          fetchByCategory("transport"),
          fetchByCategory("groceries"),
          fetchByCategory("bills"),
          fetchByCategory("luxury"),
          fetchByCategory("healthcare"),
          fetchByCategory("expense_others"),
        ]);

        return {
          foods_and_drinks,
          transport,
          groceries,
          bills,
          luxury,
          healthcare,
          expense_others,
        };
      },
    });
  };

  const getDailyTransactions = (userId: string) => {
    return useQuery({
      queryKey: ["latestTransactions", userId],
      enabled: !!userId,
      queryFn: async () => {
        const supabaseClient = assertClient();

        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabaseClient
          .from("transactions")
          .select("*")
          .eq("user_id", userId)
          .eq("transaction_date", today)
          .order("transaction_date", { ascending: false })
          .limit(10);

        if (error) throw error;

        return { data };
      },
    });
  };

  const getDailyInsights = (userId: string) => {
    const { month, year } = getCurrentMonthYear();

    return useQuery({
      queryKey: ["dailyInsights", userId, month, year],
      enabled: !!userId,
      queryFn: async () => {
        const supabaseClient = assertClient();

        const today = new Date().toISOString().split("T")[0];
        const startOfMonth = new Date(Date.UTC(year, (month as number) - 1, 1));
        const startOfNextMonth = new Date(Date.UTC(year, month as number, 1));

        // Fetch today's transactions and this month's expenses in parallel
        const [todayResult, monthExpenseResult] = await Promise.all([
          supabaseClient
            .from("transactions")
            .select("*")
            .eq("user_id", userId)
            .eq("transaction_date", today),
          supabaseClient
            .from("transactions")
            .select("amount, transaction_date")
            .eq("user_id", userId)
            .eq("type", "expense")
            .gte("transaction_date", startOfMonth.toISOString())
            .lt("transaction_date", startOfNextMonth.toISOString()),
        ]);

        if (todayResult.error) throw todayResult.error;
        if (monthExpenseResult.error) throw monthExpenseResult.error;

        const todayTransactions = (todayResult.data ?? []) as Transaction[];
        const monthExpenses = monthExpenseResult.data ?? [];

        // Today's totals
        const todayExpenseTotal = todayTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + (t.amount ?? 0), 0);

        const todayIncomeTotal = todayTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + (t.amount ?? 0), 0);

        // Daily average expense (total month expenses / days elapsed)
        const dayOfMonth = new Date().getDate();
        const totalMonthExpense = monthExpenses.reduce(
          (sum, t) => sum + (t.amount ?? 0),
          0,
        );
        const dailyAverageExpense =
          dayOfMonth > 0 ? totalMonthExpense / dayOfMonth : 0;

        // Category breakdown for today's expenses
        const categoryMap = new Map<string, number>();
        todayTransactions
          .filter((t) => t.type === "expense")
          .forEach((t) => {
            const cat = t.category ?? "expense_others";
            categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + (t.amount ?? 0));
          });
        const categoryBreakdown = Array.from(categoryMap.entries()).map(
          ([category, amount]) => ({ category, amount }),
        );

        // Largest transaction today
        const largestTransaction =
          todayTransactions.length > 0
            ? todayTransactions.reduce((max, t) =>
                (t.amount ?? 0) > (max.amount ?? 0) ? t : max,
              )
            : null;

        return {
          todayExpenseTotal,
          todayIncomeTotal,
          dailyAverageExpense,
          categoryBreakdown,
          largestTransaction,
        };
      },
    });
  };

  return {
    getCurrentMonthSummary,
    getMonthlyIncomeByCategory,
    getMonthlyExpenseByCategory,
    getDailyTransactions,
    getDailyInsights,
  };
}
