import { useCallback } from "react";
import { supabase } from "@/utils/supabase/client";
import { Transaction, TransactionInsert } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  const listTransactions = () => {
    return useQuery({
      queryKey: ["transactions"],
      queryFn: async () => {
        const supabaseClient = assertClient();

        const { data, error } = await supabaseClient
          .from("transactions")
          .select("*")
          .eq("user_id", "31d9fb33-835e-4dc5-8a01-05df3309ab14")
          .order("transaction_date", { ascending: false });

        if (error) throw error;

        return data as Transaction[];
      },
    });
  };

  const createTransaction = () => {
    return useMutation({
      mutationFn: async (transaction: TransactionInsert) => {
        const supabaseClient = assertClient();

        const { data, error } = await supabaseClient
          .from("transactions")
          .insert(transaction)
          .select()
          .single();

        if (error) throw error;

        return data as Transaction;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    });
  };

  return {
    listTransactions,
    createTransaction,
  };
}
