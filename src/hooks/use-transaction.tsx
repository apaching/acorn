import { useCallback } from "react";
import { Transaction } from "@/types/types";
import { supabase } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useTransaction() {
  const queryClient = useQueryClient();

  const assertClient = useCallback(() => {
    if (!supabase) {
      throw new Error(
        "Supabase not configured: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY",
      );
    }

    return supabase;
  }, []);

  const useListTransactions = () => {
    return useQuery({
      queryKey: ["transactions"],
      queryFn: async () => {
        const supabaseClient = assertClient();

        const { data, error } = await supabaseClient
          .from("transactions")
          .select("*")
          .eq("user_id", "31d9fb33-835e-4dc5-8a01-05df3309ab14")
          .order("transaction_date");

        if (error) throw error;

        return data as Transaction[];
      },
    });
  };

  return {
    useListTransactions,
  };
}
