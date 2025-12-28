"use client";

import { DataTable } from "./data-table";
import { transactionColumns } from "./columns";
import useTransaction from "@/hooks/use-transaction";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TransactionsHistoryPage() {
  const { useListTransactions } = useTransaction();

  const { data: transactions, isLoading, isError } = useListTransactions();

  return (
    <div className="bg- relative h-full space-y-4 px-4 py-2 sm:py-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex w-full flex-row space-x-4">
          <div className="flex w-full flex-col space-y-2 sm:max-w-[180px]">
            <p className="text-muted-foreground text-xs">Filter by Type</p>
            <CustomSelect
              selectTriggerClassname="w-full"
              placeholder={"All Types"}
              onSelect={() => {}}
            />
          </div>
          <div className="flex w-full flex-col space-y-2 sm:max-w-[180px]">
            <p className="text-muted-foreground text-xs">Filter by Category</p>
            <CustomSelect
              selectTriggerClassname="w-full"
              placeholder={"All Categories"}
              onSelect={() => {}}
            />
          </div>
        </div>
        <Button className="hidden h-8 w-8 rounded-full sm:flex sm:w-auto sm:rounded-md">
          <Plus />
          <p className="hidden sm:block">Add Transaction</p>
        </Button>
      </div>
      <DataTable data={transactions || []} columns={transactionColumns} />
      <Button className="absolute right-0 bottom-0 flex h-8 w-8 rounded-full sm:hidden">
        <Plus />
      </Button>
    </div>
  );
}
