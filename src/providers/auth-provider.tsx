"use client";

import { supabase } from "@/utils/supabase/client";
import { UserPreference, UserProfile } from "@/types/types";
import { SignUpFormData } from "@/app/auth/signup/signup-form";
import { createContext, Dispatch, useEffect, useState } from "react";
import { SignInFormData } from "@/app/auth/signin/signin-form";


type AuthContextType = {
  userProfile: UserProfile | null;
  userPreferences: UserPreference | null;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>
  signUp: (formData: SignUpFormData) => Promise<void>;
  signIn: (formData: SignInFormData) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreference | null>(null);

  async function signUp(formData: SignUpFormData) {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      
    });

    if (signUpError) throw signUpError;    

    const profileInsert = await supabase 
      .from("user_profiles")
      .insert({
        user_id: data.user?.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
      })
      

    const  preferencesInsert = await supabase
      .from("user_preferences")
      .insert({
        user_id: data.user?.id,
        currency: "PHP",
        color_theme: "green",
        mode_theme: "system"
      })


    const [profileResult, preferencesResult] = await Promise.all([profileInsert, preferencesInsert]);

    if (profileResult.error) throw profileResult.error;
    if (preferencesResult.error) throw preferencesResult.error;
  }

  async function signIn(formData: SignInFormData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  }

  useEffect(() => {
    async function load() {
      if (!supabase) return;

      try {
        setLoading(true);

        const { data: authData } = await supabase.auth.getUser();
        const user = authData.user;

        if (!user) return;

        const { data: userProfileData, error: userProfileDataError } =
          await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

        const { data: userPreferencesData, error: userPreferencesDataError } =
          await supabase
            .from("user_preferences")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

        if (userProfileDataError || userPreferencesDataError) {
          throw userProfileDataError || userPreferencesDataError;
        }

        setUserProfile(userProfileData);
        setUserPreferences(userPreferencesData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        userPreferences,
        loading,
        setLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
