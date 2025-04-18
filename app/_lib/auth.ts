import { User } from "@supabase/supabase-js";
import { createClient as createServerClient } from "./supabase-server";

export async function getUserId(): Promise<User["id"] | { error: string }> {
  const supabase = await createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return { error: "Error while fetching user." };

  if (!user) return { error: "User not authenticated." };

  return user.id;
}
