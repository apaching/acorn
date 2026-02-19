import { useCallback } from "react";
import { supabase } from "@/utils/supabase/client";
import { Transaction, TransactionInsert } from "@/types/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

const PAGE_SIZE = 15;

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

  const listTransactions = (
    userId: string,
    page: number,
    transactionType?: string,
    category?: string,
  ) => {
    return useQuery({
      queryKey: ["transactions", userId, page, transactionType, category],
      enabled: !!userId,
      placeholderData: keepPreviousData,
      queryFn: async () => {
        const supabaseClient = assertClient();

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        let query = supabaseClient
          .from("transactions")
          .select("*", { count: "exact" })
          .eq("user_id", userId)
          .order("transaction_date", { ascending: false });

        if (transactionType && transactionType !== "all") {
          query = query.eq("type", transactionType);

          if (category && !category.includes("all")) {
            query = query.eq("category", category);
          }
        }

        const { data, error, count } = await query.range(from, to);

        if (error) throw error;

        const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

        return { data, totalPages };
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

  const editTransaction = () => {
    return useMutation({
      mutationFn: async (transaction: TransactionInsert) => {
        if (!transaction.id) return;

        const supabaseClient = assertClient();

        const { data, error } = await supabaseClient
          .from("transactions")
          .update({
            amount: transaction.amount,
            category: transaction.category,
            note: transaction.note,
            transaction_date: transaction.transaction_date,
            type: transaction.type,
            updated_at: new Date().toISOString(),
            user_id: transaction.user_id,
          })
          .eq("id", transaction.id)
          .select()
          .single();

        if (error) throw error;

        return data as Transaction;
      },
      onMutate: async (updatedTransaction) => {
        await queryClient.cancelQueries({ queryKey: ["transactions"] });

        const previousTransactions = queryClient.getQueryData<Transaction[]>([
          "transactions",
        ]);

        queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) =>
          old.map((t) =>
            t.id === updatedTransaction.id
              ? { ...t, ...updatedTransaction }
              : t,
          ),
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

  const deleteTransaction = () => {
    return useMutation({
      mutationFn: async (transactionId: string) => {
        if (!transactionId) return;

        const { error } = await supabase
          .from("transactions")
          .delete()
          .eq("id", transactionId);

        if (error) throw error;
      },
      onMutate: async (transactionId) => {
        await queryClient.cancelQueries({ queryKey: ["transactions"] });

        const previousTransactions = queryClient.getQueryData<Transaction[]>([
          "transactions",
        ]);

        queryClient.setQueryData<Transaction[]>(["transactions"], (old = []) =>
          old.filter((t) => t.id != transactionId),
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
    editTransaction,
    deleteTransaction,
  };
}
