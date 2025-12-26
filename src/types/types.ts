import { Database } from "./supabase";

/**
 *  Easily useable types abstracted from supabase.ts
 */

export type Budgets = Database["public"]["Tables"]["budgets"]["Row"];
export type Transactions = Database["public"]["Tables"]["transactions"]["Row"];
export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserPreferences = Database["public"]["Tables"]["user_preferences"]["Row"];