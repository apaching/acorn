"use client";

import { Transaction } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateShort } from "@/utils/time-utils";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { allCategoriesRecord } from "@/constants/constants";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
    size: 24,
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
    size: 24,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 24,
    cell: ({ getValue }) => {
      const category = getValue<string>();

      return <div> {allCategoriesRecord[category]?.label ?? category}</div>;
    },
  },
  {
    accessorKey: "transaction_date",
    header: "Date",
    size: 16,
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
    accessorKey: "note",
    header: "Note",
    cell: ({ getValue }) => {
      const note = getValue<string>();

      return (
        <div className="flex w-auto max-w-40 items-center overflow-y-auto">
          <p>{note}</p>
        </div>
      );
    },
  },
];
