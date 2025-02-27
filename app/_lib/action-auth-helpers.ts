"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase-server";

type AuthUserSupabase = {
  user: string | undefined;
  supabase: SupabaseClient;
  error?: string;
};

// Creates server sb client and returns user (or undefined if it doesn't exist)
export async function authActionHelper(): Promise<AuthUserSupabase> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: "Error while fetching user.", user: undefined, supabase };
  }

  return { user: user?.id, supabase };
}

export async function getUserEmail() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: "Error while fetching user.", user: undefined };
  }

  return user?.email;
}
