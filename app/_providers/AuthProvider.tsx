"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import { useUser } from "../_hooks/auth/useUser";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, error } = useUser();

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
