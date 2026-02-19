import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }

  return context;
}
