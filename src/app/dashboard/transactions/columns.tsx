"use client";

import { Transaction } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { useFormState } from "./form-state-provider";
import { formatDateShort } from "@/utils/time-utils";
import {
  Trash2,
  SquarePen,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allCategoriesRecord } from "@/constants/constants";

import useTransaction from "@/hooks/use-transaction";

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
  {
    id: "action_buttons",
    cell: ({ row }) => {
      const { deleteTransaction } = useTransaction();
      const { setIsOpen, setTransaction } = useFormState();
      const { mutate, isPending } = deleteTransaction();

      const originalTransaction = row.original;

      function onEditClick() {
        setIsOpen(true);
        setTransaction({
          amount: originalTransaction.amount,
          category: originalTransaction.category,
          created_at: originalTransaction.created_at,
          id: originalTransaction.id,
          note: originalTransaction.note,
          transaction_date: originalTransaction.transaction_date,
          type: originalTransaction.type,
          updated_at: originalTransaction.updated_at,
          user_id: originalTransaction.user_id,
        });
      }

      function onDeleteClick() {
        mutate(originalTransaction.id);
      }

      return (
        <div className="flex flex-row justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer focus:outline-none">
              <MoreVertical className="text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent alignOffset={-95} align="start">
              <DropdownMenuItem onClick={onEditClick}>
                <SquarePen />
                <p>Edit</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDeleteClick}>
                <Trash2 className="text-destructive" />
                <p className="text-destructive">Delete</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
