import {
  combineDateAndTime,
  formatDateToTime,
  parseSupabaseTimestampToDate,
  parseSupabaseTimestampToTime,
} from "@/utils/time-utils";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import CustomSelect from "./custom-select";
import { Transaction } from "@/types/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useTransaction from "@/hooks/use-transaction";
import { Controller, useForm } from "react-hook-form";
import {
  incomeCategories,
  transactionTypes,
  expenseCategories,
} from "@/constants/constants";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import capitalizeFirstLetter from "@/utils/string-utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useFormState } from "@/app/dashboard/transactions/form-state-provider";
import { useAuth } from "@/hooks/use-auth";

interface TransactionModalProps {
  isOpen: boolean;
  onOpenChange: (bool: boolean) => void;
}

export type TransactionFormData = {
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date | undefined;
  time: string;
  note: string;
};

export function TransactionForm({
  isOpen,
  onOpenChange,
}: TransactionModalProps) {
  const { userProfile } = useAuth();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { transaction: transactionData, setTransaction } = useFormState();

  const now = new Date();

  const emptyDefaults: TransactionFormData = {
    amount: 0,
    type: "income",
    category: "salary",
    date: now,
    time: formatDateToTime(now),
    note: "",
  };

  const {
    reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: emptyDefaults,
  });

  const { createTransaction, editTransaction } = useTransaction();
  const { mutate: create, isPending: isCreating } = createTransaction();
  const { mutate: edit, isPending: isEditing } = editTransaction();

  const typeValue = watch("type");
  const categoryValue = watch("category");
  const dateValue = watch("date");
  const noteLength = watch("note").length;

  const transactionTypeOptions = transactionTypes.filter(
    (t) => t.value != "all",
  );
  const incomeCategoryOptions = incomeCategories.filter(
    (t) => t.value != "all_income",
  );
  const expenseCategoryOptions = expenseCategories.filter(
    (t) => t.value != "all_expense",
  );

  const handleFormStateChange = (open: boolean) => {
    if (!open) {
      reset(emptyDefaults);
      setTransaction(null);
    }

    onOpenChange(open);
  };

  const onSubmit = async (values: TransactionFormData) => {
    if (transactionData) {
      edit({
        amount: values.amount,
        category: values.category,
        note: values.note,
        transaction_date: combineDateAndTime(values.date as Date, values.time),
        type: values.type,
        user_id: userProfile?.user_id,
        id: transactionData.id,
      });

      onOpenChange(!isOpen);
      reset();

      return;
    }

    create({
      amount: values.amount,
      category: values.category,
      note: values.note,
      transaction_date: combineDateAndTime(values.date as Date, values.time),
      type: values.type,
      user_id: userProfile?.user_id,
    });

    onOpenChange(!isOpen);
    reset();
  };

  useEffect(() => {
    if (!typeValue) return;

    setValue(
      "category",
      typeValue === "income" ? "salary" : "foods_and_drinks",
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  }, [typeValue, setValue]);

  useEffect(() => {
    if (!transactionData) return;

    reset({
      amount: transactionData.amount ?? 0,
      type: transactionData.type ?? "income",
      category: transactionData.category ?? "salary",
      date: transactionData.transaction_date
        ? parseSupabaseTimestampToDate(transactionData.transaction_date)
        : now,
      time: transactionData.transaction_date
        ? parseSupabaseTimestampToTime(transactionData.transaction_date)
        : formatDateToTime(now),
      note: transactionData.note ?? "",
    });
  }, [transactionData, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleFormStateChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {transactionData ? "Edit" : "Add"} Transaction
            </DialogTitle>
            <DialogDescription>
              Edit the details of this financial transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 grid gap-6">
            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex flex-row"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {transactionTypeOptions.map((transaction, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <RadioGroupItem
                          id={`r-${index}`}
                          value={transaction.value}
                        />
                        <Label htmlFor={`r-${index}`}>
                          {transaction.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label>{`${capitalizeFirstLetter(typeValue)} Category`}</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    items={
                      typeValue === "income"
                        ? incomeCategoryOptions
                        : expenseCategoryOptions
                    }
                    selectedValue={categoryValue}
                    onSelect={field.onChange}
                    selectTriggerClassname="w-full"
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-row justify-between gap-6">
              <div className="flex w-full flex-col gap-2">
                <Label>Transaction Date</Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker"
                          className="w-full justify-between font-normal"
                        >
                          {dateValue
                            ? dateValue.toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={dateValue}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsCalendarOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  {...register("time")}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                maxLength={32}
                placeholder="Add an optional note."
                {...register("note")}
              />
              <p className="text-muted-foreground self-end text-xs">
                {noteLength} / 32
              </p>
            </div>
          </div>
          <DialogFooter className="mt-8 flex flex-row">
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreating || isEditing}
              className="hover:cursor-pointer"
            >
              {isCreating || isEditing ? (
                <Loader2 className="animate-spin" />
              ) : null}
              {isCreating || isEditing
                ? transactionData
                  ? "Editing..."
                  : "Saving..."
                : transactionData
                  ? "Edit Transaction"
                  : "Save Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
