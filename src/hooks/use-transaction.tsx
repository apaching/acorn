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

  // TODO: Change user_id to be dynamic
  const listTransactions = () => {
    return useQuery({
      queryKey: ["transactions"],
      queryFn: async () => {
        const supabaseClient = assertClient();

        const { data, error } = await supabaseClient
          .from("transactions")
          .select("*")
          .eq("user_id", "22391e64-0451-40ad-bd27-e28dc75c5c74")
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
      onMutate: async (newTransaction) => {
        await queryClient.cancelQueries({ queryKey: ["transactions"] });

        const previousTransactions = queryClient.getQueryData<Transaction[]>([
          "transactions",
        ]);

        queryClient.setQueryData<Transaction[]>(
          ["transactions"],
          (old = []) => [
            {
              ...newTransaction,
              id: crypto.randomUUID(),
              created_at: new Date().toISOString(),
            } as Transaction,
            ...old,
          ],
        );

        return { previousTransactions };
      },
      onError: (_err, _newTransaction, context) => {
        queryClient.setQueryData(
          ["transactions"],
          context?.previousTransactions,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    });
  };

  return {
    listTransactions,
    createTransaction,
  };
}
