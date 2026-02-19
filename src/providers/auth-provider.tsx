"use client";

import { supabase } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { UserPreferences, UserProfile } from "@/types/types";
import { SignInFormData } from "@/app/auth/signin/signin-form";
import { SignUpFormData } from "@/app/auth/signup/signup-form";
import { createContext, Dispatch, useEffect, useState } from "react";


type AuthContextType = {
  userProfile: UserProfile | null;
  userPreferences: UserPreferences | null;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>
  signUp: (formData: SignUpFormData) => Promise<void>;
  signIn: (formData: SignInFormData) => Promise<void>;
  signOut: () => Promise<void>;
  session: any;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

async function getUserData (userId: string) {
  const userProfileFetch = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const userPreferencesFetch = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const [userProfileData, userPreferencesData] = await Promise.all([userProfileFetch, userPreferencesFetch])

  if (userProfileData.error) throw userProfileData.error;
  if (userPreferencesData.error) throw userPreferencesData.error;

  return { userProfileData, userPreferencesData };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

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
    async function firstLoad() {
      const { data } = await supabase.auth.getSession()

      if (!data.session) return;

      try {
        const { userProfileData, userPreferencesData } = 
          await getUserData(data.session.user.id);

        setSession(data.session)
        setUserProfile(userProfileData.data);
        setUserPreferences(userPreferencesData.data);
      } catch (error) {
        console.error(error);
      }
    }

    const { data: { subscription }} = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          setSession(null);
          setUserProfile(null);
          setUserPreferences(null);

          return;
        }

        try {
          const { userProfileData, userPreferencesData } = await getUserData(session.user.id);

          setSession(session)
          setUserProfile(userProfileData.data);
          setUserPreferences(userPreferencesData.data);
        } catch (error) {
          console.log(error);
        }
      }
    )
  
    firstLoad();

    return () => { subscription.unsubscribe() }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        userPreferences,
        loading,
        session,
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
