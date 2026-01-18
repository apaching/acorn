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
      queryKey: ["currentMonthSummary", userId, month, year],
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

  return { getCurrentMonthSummary };
}
