"use server";
import { createClient } from "./supabase-server";

// Create sb client and returns user
export async function AuthActionHelper() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return error;

  return { user: user?.id, supabase };
}

// Auth
