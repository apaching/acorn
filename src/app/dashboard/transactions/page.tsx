"use client";

import {
  expenseCategories,
  incomeCategories,
  transactionTypes,
} from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { transactionColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { PencilLine, Plus } from "lucide-react";
import useTransaction from "@/hooks/use-transaction";
import CustomSelect from "@/components/custom-select";
import { TransactionForm } from "@/components/transaction-form";

export default function TransactionsHistoryPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState("all");
  const [incomeCategory, setIncomeCategory] = useState("all_income");
  const [expenseCategory, setExpenseCategory] = useState("all_expense");

  const { listTransactions } = useTransaction();
  const { data: transactions, isLoading, isError } = listTransactions();

  const handleTypeSelect = (type: string) => {
    setTransactionType(type);
  };

  const handleCategorySelect = () => {};

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const filteredTransactions =
    transactionType === "all"
      ? transactions
      : transactions?.filter(
          (transaction) => transaction.type === transactionType,
        );

  return (
    <div className="relative h-full space-y-4 px-4 py-2 sm:py-4">
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
          onClick={() => setIsOpen((prev) => !prev)}
          className="hidden h-8 w-8 rounded-full hover:cursor-pointer sm:flex sm:w-auto sm:rounded-md"
        >
          <Plus />
          <p className="hidden sm:block">Add Transaction</p>
        </Button>
      </div>

      <DataTable
        isError={isError}
        isLoading={isLoading}
        data={filteredTransactions || []}
        columns={transactionColumns}
      />

      {/* PC - Floating Action Button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute right-4 bottom-2 z-50 flex h-10 w-10 rounded-full hover:cursor-pointer sm:hidden"
      >
        <PencilLine
          strokeWidth={2}
          className="text-primary-foreground h-8 w-8"
        />
      </Button>

      <TransactionForm
        isOpen={isOpen}
        onOpenChange={(bool: boolean) => {
          setIsOpen(bool);
        }}
        onSubmit={() => {}}
      />
    </div>
  );
}
