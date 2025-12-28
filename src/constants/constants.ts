import {
  Gem,
  Settings,
  Utensils,
  Ambulance,
  PiggyBank,
  HandCoins,
  CircleHelp,
  CreditCard,
  ReceiptText,
  ShoppingCart,
  CarTaxiFront,
  LayoutDashboard,
  BanknoteArrowUp,
  BriefcaseBusiness,
} from "lucide-react";

export const incomingCategories = [
  {
    category: "Salary",
    icon: HandCoins,
  },
  {
    category: "Allowance",
    icon: PiggyBank,
  },
  {
    category: "Side Income",
    icon: BanknoteArrowUp,
  },
  {
    category: "Business",
    icon: BriefcaseBusiness,
  },
  {
    category: "Others",
    icon: CircleHelp,
  },
];

export const outgoingCategories = [
  {
    category: "Foods & Drinks",
    icon: Utensils,
  },
  {
    category: "Transport",
    icon: CarTaxiFront,
  },
  {
    category: "Groceries",
    icon: ShoppingCart,
  },
  {
    category: "Bills",
    icon: ReceiptText,
  },
  {
    category: "Luxury",
    icon: Gem,
  },
  {
    category: "Healthcare",
    icon: Ambulance,
  },
  {
    category: "Others",
    icon: CircleHelp,
  },
];
