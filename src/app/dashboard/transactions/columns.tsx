"use client";

import { Transaction } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateShort } from "@/utils/time-utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      const type = getValue();

      return (
        <div className="items-cente ml-0.5 flex">
          <div
            className={`rounded-full p-1 ${type === "income" ? "bg-income" : "bg-expense"}`}
          >
            {type === "income" ? (
              <ArrowDownLeft className="size-4" />
            ) : (
              <ArrowUpRight className="size-4" />
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "transaction_date",
    header: "Date",
    cell: ({ getValue }) => {
      const date = getValue<string>();

      return (
        <div className="flex items-center">
          <p>{formatDateShort(date)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
