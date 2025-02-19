"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase-server";

type AuthUserSupabase = {
  user: string | undefined;
  supabase: SupabaseClient;
};

// Create sb client and returns user (or undefined if it doesn't exist)
export async function AuthActionHelper(): Promise<AuthUserSupabase> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Error while fetching user: ", error.message);
    return {
      user: undefined,
      supabase,
    };
  }

  return { user: user?.id, supabase };
}
