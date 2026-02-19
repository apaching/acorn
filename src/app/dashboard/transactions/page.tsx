"use client";

import {
  expenseCategories,
  incomeCategories,
  transactionTypes,
} from "@/constants/constants";
import { useState } from "react";
import { transactionColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { PencilLine, Plus } from "lucide-react";
import { useFormState } from "./form-state-provider";
import useTransaction from "@/hooks/use-transaction";
import CustomSelect from "@/components/custom-select";
import { TransactionForm } from "@/components/transaction-form";
import { useAuth } from "@/hooks/use-auth";
import { CustomPagination } from "@/components/custom-pagination";
import { DataTable } from "@/app/dashboard/transactions/data-table";

/**
 *  TODO:
 *    - Page size pagination filter
 *    - Filter by date/month, etc.
 *    - Better UI/UX loading when changing filters, etc.
 */

export default function TransactionsHistoryPage() {
  const { userProfile } = useAuth();
  const { isOpen, setIsOpen } = useFormState();

  const [transactionType, setTransactionType] = useState("all");
  const [incomeCategory, setIncomeCategory] = useState("all_income");
  const [expenseCategory, setExpenseCategory] = useState("all_expense");

  const [page, setPage] = useState(1);

  const { listTransactions } = useTransaction();

  const category =
    transactionType === "income"
      ? incomeCategory
      : transactionType === "expense"
        ? expenseCategory
        : undefined;

  const {
    data: transactions,
    isLoading,
    isError,
  } = listTransactions(
    userProfile?.user_id as string,
    page,
    transactionType === "all" ? undefined : transactionType,
    category && !category.includes("all") ? category : undefined,
  );

  const handleTypeSelect = (type: string) => {
    setTransactionType(type);

    setIncomeCategory("all_income");
    setExpenseCategory("all_expense");
  };

  const handleCategorySelect = (category: string) => {
    if (transactionType === "income") {
      setIncomeCategory(category);
      setExpenseCategory("all_expense");
    } else {
      setIncomeCategory("all_income");
      setExpenseCategory(category);
    }
  };

  return (
    <div className="relative flex h-full flex-col space-y-4 px-4 py-2 sm:py-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex w-full flex-row space-x-4">
          <div className="flex w-full flex-col space-y-2 sm:max-w-[180px]">
            <p className="text-muted-foreground text-xs">Filter by Type</p>
            <CustomSelect
              items={transactionTypes}
              selectedValue={transactionType}
              onSelect={handleTypeSelect}
              placeholder={"All"}
              selectTriggerClassname="w-full"
            />
          </div>
          <div className="flex w-full flex-col space-y-2 sm:max-w-[180px]">
            <p className="text-muted-foreground text-xs">Filter by Category</p>
            <CustomSelect
              items={
                transactionType === "income"
                  ? incomeCategories
                  : expenseCategories
              }
              selectedValue={
                transactionType === "income" ? incomeCategory : expenseCategory
              }
              onSelect={handleCategorySelect}
              placeholder={"All"}
              selectTriggerClassname="w-full"
              isDisabled={transactionType === "all"}
            />
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden h-8 w-8 rounded-full hover:cursor-pointer sm:flex sm:w-auto sm:rounded-md"
        >
          <Plus />
          <p className="hidden sm:block">Add Transaction</p>
        </Button>
      </div>

      <DataTable
        isError={isError}
        isLoading={isLoading || !userProfile}
        data={transactions?.data || []}
        columns={transactionColumns}
      />

      <div className="mt-auto mb-2 flex w-full items-center justify-center">
        <CustomPagination
          page={page}
          setPage={setPage}
          numberOfPages={transactions?.totalPages as number}
        />
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full shadow-lg hover:cursor-pointer sm:hidden"
      >
        <PencilLine
          strokeWidth={1.75}
          className="text-primary-foreground h-5 w-5"
        />
      </Button>

      <TransactionForm
        isOpen={isOpen}
        onOpenChange={(bool: boolean) => {
          setIsOpen(bool);
        }}
      />
    </div>
  );
}
