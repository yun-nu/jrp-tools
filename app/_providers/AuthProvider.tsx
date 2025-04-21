"use client";

import { User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "../_lib/supabase-client";
import { useQuery } from "@tanstack/react-query";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return null;

      const { data, error } = await supabase.auth.getUser();

      if (error) throw new Error(error.message);

      return data?.user;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

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

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const supabase = createClient();
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user ?? null);
//       setIsLoading(false);
//     });
//     const { data: listener } = supabase.auth.onAuthStateChange(() => {
//       supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
//     });
//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, [supabase]);

//   return (
//     <AuthContext.Provider value={{ user, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
