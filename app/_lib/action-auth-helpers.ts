"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase-server";

type AuthUserSupabase = {
  userId?: string;
  supabase: SupabaseClient;
  error?: string;
};

// Creates server sb client and returns user ID (or undefined if it doesn't exist)
export async function getClientAndUser(): Promise<AuthUserSupabase> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: "Error while fetching user.", supabase };
  }

  if (!user) {
    return { error: "No authenticated user found.", supabase };
  }

  return { userId: user.id, supabase };
}

export async function getUserEmail() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: "Error while fetching user." };
  }

  if (!user) {
    return { error: "No authenticated user found." };
  }

  return { email: user.email };
}
