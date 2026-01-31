/**
 *  Functions for fetching data from the 'Quick Overview' page
 */

import { useCallback } from "react";
import { supabase } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentMonthYear } from "@/utils/time-utils";

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
      queryKey: ["currentMonthSummary"],
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
      queryKey: ["monthlyIncomeByCategory"],
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
      queryKey: ["monthlyExpenseCategory"],
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

  return {
    getCurrentMonthSummary,
    getMonthlyIncomeByCategory,
    getMonthlyExpenseByCategory,
  };
}
