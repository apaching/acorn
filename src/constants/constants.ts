import {
  Gem,
  Utensils,
  Ambulance,
  PiggyBank,
  HandCoins,
  CircleHelp,
  LucideIcon,
  ReceiptText,
  ShoppingCart,
  CarTaxiFront,
  BanknoteArrowUp,
  BriefcaseBusiness,
} from "lucide-react";

/**
 *  Categories
 */
export type CategoryOption = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

export const transactionTypes = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Expense",
    value: "expense",
  },
];

export const incomeCategories = [
  {
    label: "All",
    value: "all_income",
  },
  {
    label: "Salary",
    value: "salary",
    icon: HandCoins,
  },
  {
    label: "Allowance",
    value: "allowance",
    icon: PiggyBank,
  },
  {
    label: "Side Income",
    value: "side_income",
    icon: BanknoteArrowUp,
  },
  {
    label: "Business",
    value: "business",
    icon: BriefcaseBusiness,
  },
  {
    label: "Others",
    value: "income_others",
    icon: CircleHelp,
  },
];

export const expenseCategories = [
  {
    label: "All",
    value: "all_expense",
  },
  {
    label: "Foods & Drinks",
    value: "foods_and_drinks",
    icon: Utensils,
  },
  {
    label: "Transport",
    value: "transport",
    icon: CarTaxiFront,
  },
  {
    label: "Groceries",
    value: "groceries",
    icon: ShoppingCart,
  },
  {
    label: "Bills",
    value: "bills",
    icon: ReceiptText,
  },
  {
    label: "Luxury",
    value: "luxury",
    icon: Gem,
  },
  {
    label: "Healthcare",
    value: "healthcare",
    icon: Ambulance,
  },
  {
    label: "Others",
    value: "expense_others",
    icon: CircleHelp,
  },
];

export const allCategoriesRecord: Record<string, CategoryOption> = [
  ...incomeCategories,
  ...expenseCategories,
].reduce(
  (acc, category) => {
    acc[category.value] = category;
    return acc;
  },
  {} as Record<string, CategoryOption>,
);

/**
 *  Currencies
 */
