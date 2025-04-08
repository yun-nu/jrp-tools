import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase-server";

export async function getUserId(): Promise<User["id"] | { error: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return { error: "Error while fetching user." };

  if (!user) return { error: "User not authenticated." };

  return user.id;
}
