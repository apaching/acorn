import { Database } from "./supabase";

/**
 *  Easily useable types abstracted from supabase.ts
 */

export type Budget = Database["public"]["Tables"]["budgets"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserPreference = Database["public"]["Tables"]["user_preferences"]["Row"];