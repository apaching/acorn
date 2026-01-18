"use client";

import { Transaction } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

type FormStateContext = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  transaction: Transaction | null;
  setTransaction: (transaction: Transaction | null) => void;
};

const FormStateContext = createContext<FormStateContext | undefined>(undefined);

export const useFormState = () => {
  const context = useContext(FormStateContext);

  if (!context)
    throw new Error("useFormState must be used within FormStateProvider");

  return context;
};

export const FormStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  return (
    <FormStateContext.Provider
      value={{
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        transaction: transaction,
        setTransaction: setTransaction,
      }}
    >
      {children}
    </FormStateContext.Provider>
  );
};
