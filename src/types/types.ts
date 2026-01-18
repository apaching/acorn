import { Database } from "./supabase";

/**
 *  Easily useable row types abstracted from supabase.ts
 */
export type Budget = Database["public"]["Tables"]["budgets"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserPreferences = Database["public"]["Tables"]["user_preferences"]["Row"];

/**
 *  Insert types
 */
export type BudgetInsert = Database["public"]["Tables"]["budgets"]["Insert"];
export type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
export type UserProfileInsert = Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserPreferencesInsert = Database["public"]["Tables"]["user_preferences"]["Insert"];
